import argparse
import os


def main(): 
    parser = argparse.ArgumentParser(description='Run a rel script')
    parser.add_argument('string', type=str, help='Run a rel script. rel script.rel (change to your filename)')

    args = parser.parse_args()


    def run(name):
        os.system("node " + name)

    run(args.string)

if __name__ == "__main__":
    main()
