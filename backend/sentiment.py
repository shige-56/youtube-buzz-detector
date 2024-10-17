from textblob import TextBlob

def analyze_sentiment(text):
    analysis = TextBlob(text)
    return analysis.sentiment.polarity  # -1 (ネガ) ～ 1 (ポジ)

if __name__ == "__main__":
    print(analyze_sentiment("This video is amazing!"))
