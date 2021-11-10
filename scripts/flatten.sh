#!/bin/bash
for FILE in ./contracts/*.sol; do
    file_name=$(basename "$FILE")
    echo $file_name
    npx hardhat flatten $FILE > "./flat/${file_name%.*}.txt"
done