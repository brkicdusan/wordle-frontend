package main

import (
	"bufio"
	"flag"
	"log"
	"os"
	"path/filepath"
	"strings"
	"unicode"
	"unicode/utf8"
)

func main() {
	var language string
	var dest string
	var source_dir string

	flag.StringVar(&language,
		"language", "english", "language")
	flag.StringVar(&dest,
		"destination", "../../src/lib/", "destination folder")
	flag.StringVar(&source_dir, "source", ".", "source directory")

	flag.Parse()

	err := handleLanguage(source_dir, language, dest)
	if err != nil {
		log.Fatal(err)
	}
}

func handleLanguage(source_dir string, language string, dest_folder string) error {
	source := language + ".txt"
	source = filepath.Join(source_dir, source)
	wordlist, err := getWordList(source)
	if err != nil {
		return err
	}

	wordlist = filterInvalid(wordlist)

	list5letter := []string{}
	for _, e := range wordlist {
		if wordLength(e.Word) == 5 {
			list5letter = append(list5letter, e.Word)
		}
	}

	file_name := language + "_5_letters.txt"
	output_path := filepath.Join(dest_folder, file_name)

	err = fillFile(list5letter, output_path)
	if err != nil {
		return err
	}
	return nil
}

func fillFile(words []string, output_path string) error {
	file, err := os.Create(output_path)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	for _, word := range words {
		_, err := writer.WriteString(word + "\n")
		if err != nil {
			return err
		}
	}

	return writer.Flush()
}

type element struct {
	Word string
	Freq int
}

func wordLength(s string) int {
	return utf8.RuneCountInString(s)
}

func filterInvalid(wordlist []element) []element {
	newWordlist := []element{}

	for _, e := range wordlist {
		if !IsLetter(e.Word) {
			continue
		}

		newWordlist = append(newWordlist, e)
	}

	return newWordlist
}

func IsLetter(s string) bool {
	for _, r := range s {
		if !unicode.IsLetter(r) {
			return false
		}
	}
	return true
}

func getWordList(filename string) ([]element, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	const maxCapacity = 10 * 1024 * 1024

	buf := make([]byte, maxCapacity)
	scanner.Buffer(buf, maxCapacity)

	list := []element{}

	for scanner.Scan() {
		line := scanner.Text()
		words := strings.Split(line, ",")
		for _, word := range words {
			list = append(list, element{
				word,
				0,
			})
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return list, nil
}
