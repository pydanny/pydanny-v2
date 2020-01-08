"""
Titlecases all markdown section headers in a directory.
Confirmed to work with Python 2.7, 3.3, and 3.4.

Usage:

  python titlemd.py a-directory/
  python titlemd.py  # defaults to '.'
"""

import fnmatch
import os
import sys

try:
  from titlecase import titlecase
except ImportError:
  print("Please install titlecase")

def main(location):
  for root, dirs, files in os.walk(location):
      for item in fnmatch.filter(files, "*.md"):
          file_path = os.path.join(root, item)
          print(file_path)

          # Open the file and read the lines as a list
          with open(file_path) as f:
              lines = f.readlines()

          with open(file_path, 'w') as f:
              # Loop through the list of lines and titlecase
              # any line beginning with '#'.
              for line in lines:
                  if line.strip().startswith('#'):
                      line = titlecase(line)
                  f.write(line)

if __name__ == "__main__":
  try:
      main(sys.argv[1])
  except IndexError:
      main('.')