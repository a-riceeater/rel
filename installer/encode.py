import base64
import os

with open("installer/rel.zip", "rb") as f:
    data = f.read()
    base64_data = base64.b64encode(data).decode("utf-8")

    print("Encoding...")
    with open("installer/base64.txt", "w") as f:
        f.write(base64_data)
        print("Encoded!")
