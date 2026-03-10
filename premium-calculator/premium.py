import requests

API_KEY = "5adde0c7e7b44a7cae7bd0d86681289b"


def get_weather(city):

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)
    data = response.json()
    
    if "main" not in data:
        print("Error getting weather data. Check city name or API key.")
        return 0, 0

    rainfall = 0
    if "rain" in data:
        rainfall = data["rain"].get("1h", 0)

    pollution = data["main"]["humidity"]

    return rainfall, pollution

def calculate_risk_score(rainfall, pollution):

    risk_score = (rainfall * 0.6) + (pollution * 0.4)

    return risk_score


def calculate_premium(score):

    if score < 30:
        return 50, "Low Risk"

    elif score < 60:
        return 80, "Medium Risk"

    else:
        return 100, "High Risk"


def main(): 

    print("AI Insurance Premium Calculator")

    city = input("Enter city name: ")

    rainfall, pollution = get_weather(city)

    score = calculate_risk_score(rainfall, pollution)

    premium, level = calculate_premium(score)

    print("\nRainfall:", rainfall)
    print("Pollution/Humidity:", pollution)
    print("Risk Score:", score)
    print("Risk Level:", level)
    print("Weekly Premium: ₹", premium)


if __name__ == "__main__":
    main()