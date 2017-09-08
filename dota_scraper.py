import requests
import bs4
import csv

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'}

#main
for n in range(1,52):
	r = requests.get('https://www.dotabuff.com/players/58854550/matches?page='+str(n), headers=headers)

	soup = bs4.BeautifulSoup(r.text, "html.parser")

	duration = soup.select("section:nth-of-type(3) tbody tr td.r-none-mobile")
	heroes = soup.select(".cell-large a")
	kda = soup.select(".kda-record")
	date = soup.select("time")

	with open('dota.csv', 'a') as csvfile:
		data = ['Date', 'Result', 'Hero', 'Duration', 'KDA']
		writer = csv.DictWriter(csvfile, fieldnames=data)
		if not csvfile.tell():
			writer.writeheader() # this writes the first row with the column headings
		counter = 0
		for index, data in enumerate(duration):
			if index % 2:
				writer.writerow({
					'Date': date[counter].text,
					'Result': duration[index-1].findNext('td').text[0:4],
			        'Hero': heroes[counter].text,
			        'Duration':  data.findNext('td').text,
					'KDA': kda[counter].text
			    }) 
				counter += 1

#breacher
for n in range(1,14):
	r = requests.get('https://www.dotabuff.com/players/172809161/matches?page='+str(n), headers=headers)

	soup = bs4.BeautifulSoup(r.text, "html.parser")

	duration = soup.select("section:nth-of-type(3) tbody tr td.r-none-mobile")
	heroes = soup.select(".cell-large a")
	kda = soup.select(".kda-record")
	date = soup.select("time")

	with open('dota.csv', 'a') as csvfile:
		data = ['Date', 'Result', 'Hero', 'Duration', 'KDA']
		writer = csv.DictWriter(csvfile, fieldnames=data)
		if not csvfile.tell():
			writer.writeheader() # this writes the first row with the column headings
		counter = 0
		for index, data in enumerate(duration):
			if index % 2:
				writer.writerow({
					'Date': date[counter].text,
					'Result': duration[index-1].findNext('td').text[0:4],
			        'Hero': heroes[counter].text,
			        'Duration':  data.findNext('td').text,
			        'KDA': kda[counter].text
			    }) 
				counter += 1

#pumbloom
for n in range(1,15):
	r = requests.get('https://www.dotabuff.com/players/129121790/matches?page='+str(n), headers=headers)

	soup = bs4.BeautifulSoup(r.text, "html.parser")

	duration = soup.select("section:nth-of-type(3) tbody tr td.r-none-mobile")
	heroes = soup.select(".cell-large a")
	kda = soup.select(".kda-record")
	date = soup.select("time")

	with open('dota.csv', 'a') as csvfile:
		data = ['Date', 'Result', 'Hero', 'Duration', 'KDA']
		writer = csv.DictWriter(csvfile, fieldnames=data)
		if not csvfile.tell():
			writer.writeheader() # this writes the first row with the column headings
		counter = 0
		for index, data in enumerate(duration):
			if index % 2:
				writer.writerow({
					'Date': date[counter].text,
					'Result': duration[index-1].findNext('td').text[0:4],
			        'Hero': heroes[counter].text,
			        'Duration':  data.findNext('td').text,
			        'KDA': kda[counter].text
			    }) 
				counter += 1

#aykay
for n in range(1,15):
	r = requests.get('https://www.dotabuff.com/players/10284906/matches?page='+str(n), headers=headers)

	soup = bs4.BeautifulSoup(r.text, "html.parser")

	duration = soup.select("section:nth-of-type(3) tbody tr td.r-none-mobile")
	heroes = soup.select(".cell-large a")
	kda = soup.select(".kda-record")
	date = soup.select("time")

	with open('dota.csv', 'a') as csvfile:
		data = ['Date', 'Result', 'Hero', 'Duration', 'KDA']
		writer = csv.DictWriter(csvfile, fieldnames=data)
		if not csvfile.tell():
			writer.writeheader() # this writes the first row with the column headings
		counter = 0
		for index, data in enumerate(duration):
			if index % 2:
				writer.writerow({
					'Date': date[counter].text,
					'Result': duration[index-1].findNext('td').text[0:4],
			        'Hero': heroes[counter].text,
			        'Duration':  data.findNext('td').text,
			        'KDA': kda[counter].text
			    }) 
				counter += 1
