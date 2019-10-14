from sys import argv
from tempfile import NamedTemporaryFile
import re
import subprocess

open_pattern = re.compile("\s*`{3}\s*python")
close_pattern = re.compile("\s*`{3}")
test_filename = "testfile.py"


def main(filename):
    # Create an array of the Python code called "code"
    code = []
    in_python = False
    with open(filename) as f:
        for line in f.readlines():
            if re.match(open_pattern, line) is not None:
                in_python = True
                continue
            if in_python == True and re.match(close_pattern, line):
                in_python = False
            if in_python == True:
                code.append(line)

    # Save the code as a string to the testfile
    # `tempfile.NamedTempFile` fails here because the `write()` doesn't seem to occur
    # until the `with` statement is finished. I would love to be wrong in that, using
    # a tempfile is the cleaner approach. Please let me know a better approach.
    with open(test_filename, mode="w") as f:
        f.writelines("".join(code))

    # Run the code
    cmd = ["python", test_filename]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = proc.communicate()

    # Display the results
    print("Output: " + output.decode("ascii"))
    print("Error: " + error.decode("ascii"))
    print("Code: " + str(proc.returncode))

    # Cleanup
    os.remove(test_filename)


if __name__ == "__main__":
    main(argv[1])

