import asyncio
import websockets
import json
from cryptography.hazmat.primitives.asymmetric import dh

CLIENTS = {} # format: {name: [websocket, public_key]}
numClients = 0
currID = 0
parameters = dh.generate_parameters(2, 2048)
print("Server is ready.")

def register_event(id):
    return json.dumps({"type": "register",
                       "id": id,
                       "prime": hex(parameters.parameter_numbers().p)[2:]})

def users_event():
    return json.dumps({"type": "users", "value": {k:v[1] for (k,v) in CLIENTS.items()}})

async def messages(websocket):
    global CLIENTS, numClients, currID, parameters
    print("A client has connected. Waiting for name...")
    try:
        # Check the name for uniqueness
        name = ""
        name = await websocket.recv()
        name = json.loads(name)["name"]
        if (name in CLIENTS.keys()):
            await websocket.send(register_event(-2))
            print(f"Duplicate client {name}. Closing connection...")
            name = ""
            return
        
        # Register the client
        print(f"Registering new client {name}.")
        CLIENTS[name] = [websocket]
        numClients += 1
        print(f"{numClients} clients online.")
        await websocket.send(register_event(currID))

        # Get public key from client
        pubKey = await websocket.recv()
        pubKey = json.loads(pubKey)["pubKey"]
        CLIENTS[name].append(pubKey)

        # Broadcast users event
        clientValues = list(CLIENTS.values())
        clientSockets = [cv[0] for cv in clientValues]
        websockets.broadcast(clientSockets, users_event())

        currID += 1
        
        # Listen to incoming messages
        async for message in websocket:
            print(f"recieved message from {name}: {message}")
            out = [CLIENTS[name][0], CLIENTS[json.loads(message)["to"]][0]]
            websockets.broadcast(out, message)
    
    except websockets.exceptions.ConnectionClosedOK:
        print("Connection closed without errors.")

    except websockets.exceptions.ConnectionClosedError:
        print("Connection closed with an error.")
        
    finally:
        if (name in CLIENTS.keys()):
            print(f"Client {name} has disconnected.")
            CLIENTS.pop(name)
            clientValues = list(CLIENTS.values())
            clientSockets = [cv[0] for cv in clientValues]
            websockets.broadcast(clientSockets, users_event())
            numClients -= 1
        print(f"{numClients} clients online.")

async def main():
    async with websockets.serve(messages, "localhost", 8000):
        await asyncio.Future()  # run forever

asyncio.run(main())