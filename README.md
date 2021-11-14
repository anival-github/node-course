# Ciphering CLI Tool

To run the app, please run the following steps:

## 1. Download the app on your local machine

Run the follwing commaind in your terminal:

    git clone git@github.com:anival-github/node-course.git

## 2. Go to the downloaded repository

## 3. Go to the branch **ciphering-cli-tool**

Run the follwing commaind in your terminal:

    git checkout ciphering-cli-tool

## 4. Install dependencies

Run the follwing commaind in your terminal:

    npm i

## 5. Start app

To run the app, you need to enter
    **node my_ciphering_cli**
with the following options:

1.  -c, --config (obligatory): config for ciphers Config is a string with pattern {XY(-)}n, where:
- X is a cipher mark:
- C is for Caesar cipher (with shift 1)
- A is for Atbash cipher
- R is for ROT-8 cipher
- Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    - 1 is for encoding
    - 0 is for decoding
2. -i, --input: a path to input file. If no input provided, you will need to pass a string to be encrypted into your terminal
3. -o, --output: a path to output file. If no output provided, encripted output will be written in your terminal

## Usage example:

    node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
