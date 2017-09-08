# Dota 2 D3 visualsation and webscraper
___

This project is to help people who have too many account (like myself) and want to visualise and gather information so that they have the more accurate representation of their collective statistics.


## How to use

1 - Replace the range number as well as the URL to your profile page.

```py
for n in range(1, 52):
	r = requests.get('https://www.dotabuff.com/players/58854550/matches?page='+str(n), headers=headers)
```

2 - Run the webscraped using this command in the terminal where the file is located

```
python3 dota_scraper.py
```

This should take a while depending how much data you are trying to scrape.

It should ouput a dota2.csv file.

3 - Run the d3 visualisation on your local server 

```
python3 -m http.server
```

Follow the terminals output and paste the URL into your hotbar