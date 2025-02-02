import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore, MenuBook } from "@mui/icons-material";

const curriculum = {
  basics: {
    title: "Python Basics",
    chapters: [
      {
        title: "Introduction to Python and Programming",
        exercise: {
          description:
            "Let's write your first Python program! Create a program that prints 'Hello, Python World!' to the screen.",
          startingCode:
            "# Write a print statement to display 'Hello, Python World!'\n\n",
          solution: "print('Hello, Python World!')",
          hint: "In Python, we use the print() function to display text on the screen.",
        },
      },
      {
        title: "Variables and Data Types",
        exercise: {
          description:
            "Create variables to store your name and age, then print them in a sentence.",
          startingCode:
            "# Create variables for name and age\n# Then print: 'My name is [name] and I am [age] years old'\n\n",
          solution:
            "name = 'Alex'\nage = 10\nprint(f'My name is {name} and I am {age} years old')",
          hint: "Use descriptive variable names and remember to use quotes for text (strings).",
        },
      },
      {
        title: "Numbers and Basic Math Operations",
        exercise: {
          description:
            "Write a program that calculates the area of a rectangle.",
          startingCode:
            "# Calculate the area of a rectangle\n# Length = 5, Width = 3\n\n",
          solution:
            "length = 5\nwidth = 3\narea = length * width\nprint(f'The area of the rectangle is {area}')",
          hint: "Area of a rectangle is calculated by multiplying length by width.",
        },
      },
      {
        title: "Strings and Text Manipulation",
        exercise: {
          description:
            "Create a program that takes a word and prints it in reverse.",
          startingCode:
            "# Create a variable with the word 'Python'\n# Then print it in reverse\n\n",
          solution:
            "word = 'Python'\nreversed_word = word[::-1]\nprint(f'The word {word} in reverse is {reversed_word}')",
          hint: "In Python, you can reverse a string using slice notation [::-1]",
        },
      },
      {
        title: "Lists and Collections",
        exercise: {
          description:
            "Create a list of your favorite fruits and print each one.",
          startingCode:
            "# Create a list of fruits\n# Then print each fruit using a loop\n\n",
          solution:
            "fruits = ['apple', 'banana', 'orange']\nfor fruit in fruits:\n    print(f'I like {fruit}s!')",
          hint: "Use square brackets [] to create a list and a for loop to print each item.",
        },
      },
      {
        title: "Making Decisions with If Statements",
        exercise: {
          description:
            "Write a program that checks if a number is positive, negative, or zero.",
          startingCode:
            "# Write code to check if number is positive, negative, or zero\nnumber = 5\n\n",
          solution:
            "number = 5\nif number > 0:\n    print('The number is positive')\nelif number < 0:\n    print('The number is negative')\nelse:\n    print('The number is zero')",
          hint: "Use if, elif, and else statements to check different conditions.",
        },
      },
      {
        title: "Loops: Doing Things Multiple Times",
        exercise: {
          description:
            "Create a program that counts from 1 to 5 and prints each number.",
          startingCode: "# Use a for loop to count from 1 to 5\n\n",
          solution: "for i in range(1, 6):\n    print(f'Count: {i}')",
          hint: "The range() function helps you create a sequence of numbers.",
        },
      },
      {
        title: "Functions: Creating Reusable Code",
        exercise: {
          description: "Create a function that greets a person by name.",
          startingCode:
            "# Create a function that takes a name and prints a greeting\n\n",
          solution:
            "def greet(name):\n    print(f'Hello, {name}! Nice to meet you!')\n\n# Test the function\ngreet('Alice')",
          hint: "Use the def keyword to create a function and parameters to pass information to it.",
        },
      },
      {
        title: "Input and Output",
        exercise: {
          description:
            "Create a program that asks for the user's name and age, then prints them.",
          startingCode:
            "# Use input() to get user's name and age\n# Then print them in a sentence\n\n",
          solution:
            "name = input('What is your name? ')\nage = input('How old are you? ')\nprint(f'Nice to meet you, {name}! You are {age} years old.')",
          hint: "The input() function helps you get information from the user.",
        },
      },
      {
        title: "Basic Error Handling",
        exercise: {
          description:
            "Write a program that safely converts user input to a number.",
          startingCode:
            "# Try to convert user input to a number\n# Handle any errors that might occur\n\n",
          solution:
            "try:\n    number = int(input('Enter a number: '))\n    print(f'You entered: {number}')\nexcept ValueError:\n    print('That was not a valid number!')",
          hint: "Use try and except blocks to handle potential errors when converting strings to numbers.",
        },
      },
    ],
  },
  intermediate: {
    title: "Intermediate Python",
    chapters: [
      {
        title: "Dictionaries and Sets",
        exercise: {
          description:
            "Create a dictionary of your favorite books and their authors, then print them.",
          startingCode:
            "# Create a dictionary of books and authors\n# Then print each book and its author\n\n",
          solution:
            "books = {\n    'Harry Potter': 'J.K. Rowling',\n    'Percy Jackson': 'Rick Riordan',\n    'The Hobbit': 'J.R.R. Tolkien'\n}\n\nfor book, author in books.items():\n    print(f'{book} was written by {author}')",
          hint: "Use curly braces {} to create a dictionary and the items() method to loop through it.",
        },
      },
      {
        title: "More About Functions",
        exercise: {
          description:
            "Create a function that calculates the average of a list of numbers.",
          startingCode:
            "# Create a function that takes a list of numbers and returns their average\n\n",
          solution:
            "def calculate_average(numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)\n\n# Test the function\nnumbers = [10, 20, 30, 40, 50]\naverage = calculate_average(numbers)\nprint(f'The average is: {average}')",
          hint: "Remember to handle empty lists and use sum() and len() functions.",
        },
      },
      {
        title: "File Handling",
        exercise: {
          description:
            "Write a program that creates a file, writes some text to it, and then reads it back.",
          startingCode:
            "# Create a file named 'my_diary.txt'\n# Write a message and then read it back\n\n",
          solution:
            "# Writing to the file\nwith open('my_diary.txt', 'w') as file:\n    file.write('Dear Diary,\nToday I learned Python!')\n\n# Reading from the file\nwith open('my_diary.txt', 'r') as file:\n    content = file.read()\n    print('File contents:', content)",
          hint: "Use 'with' statement to safely handle files and remember to close them properly.",
        },
      },
      {
        title: "Modules and Packages",
        exercise: {
          description:
            "Create a program that uses the random module to create a simple number guessing game.",
          startingCode:
            "# Import the random module\n# Create a number guessing game\n\n",
          solution:
            "import random\n\nsecret_number = random.randint(1, 10)\nprint('I\'m thinking of a number between 1 and 10')\n\nguess = int(input('Your guess: '))\nif guess == secret_number:\n    print('You got it!')\nelse:\n    print(f'Sorry, it was {secret_number}')",
          hint: "Use random.randint() to generate a random number within a range.",
        },
      },
      {
        title: "List Comprehensions",
        exercise: {
          description:
            "Use a list comprehension to create a list of squares from 1 to 5.",
          startingCode:
            "# Create a list of squares using list comprehension\n\n",
          solution:
            "squares = [x**2 for x in range(1, 6)]\nprint('Squares:', squares)",
          hint: "List comprehensions provide a concise way to create lists using a single line of code.",
        },
      },
      {
        title: "Tuples and Their Uses",
        exercise: {
          description:
            "Create a program that stores and displays coordinates using tuples.",
          startingCode:
            "# Create tuples for coordinates\n# Calculate distance between points\n\n",
          solution:
            "import math\n\npoint1 = (0, 0)\npoint2 = (3, 4)\n\ndistance = math.sqrt((point2[0] - point1[0])**2 + (point2[1] - point1[1])**2)\nprint(f'Distance between {point1} and {point2} is {distance}')",
          hint: "Tuples are immutable sequences, perfect for representing coordinates.",
        },
      },
      {
        title: "Working with JSON Data",
        exercise: {
          description:
            "Create a program that converts a Python dictionary to JSON and back.",
          startingCode:
            "# Import json module\n# Convert dictionary to JSON and back\n\n",
          solution:
            "import json\n\nstudent = {\n    'name': 'Alice',\n    'age': 12,\n    'grades': [95, 88, 92]\n}\n\n# Convert to JSON\njson_data = json.dumps(student)\nprint('JSON:', json_data)\n\n# Convert back to Python\npython_data = json.loads(json_data)\nprint('Python:', python_data)",
          hint: "Use json.dumps() to convert to JSON and json.loads() to convert back to Python.",
        },
      },
      {
        title: "Basic Object-Oriented Programming",
        exercise: {
          description:
            "Create a simple class to represent a pet with name and age attributes.",
          startingCode: "# Create a Pet class with name and age\n\n",
          solution:
            "class Pet:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def introduce(self):\n        print(f'Hi, I\'m {self.name} and I\'m {self.age} years old!')\n\n# Create a pet\nmy_pet = Pet('Fluffy', 3)\nmy_pet.introduce()",
          hint: "Classes help organize code and data together. Use __init__ for initialization.",
        },
      },
      {
        title: "Regular Expressions Basics",
        exercise: {
          description:
            "Write a program that checks if a string is a valid email address using regex.",
          startingCode:
            "# Import re module\n# Check if string is valid email\n\n",
          solution:
            "import re\n\ndef is_valid_email(email):\n    pattern = r'^[w.-]+@[w.-]+.w+$'\n    return bool(re.match(pattern, email))\n\n# Test the function\nemail = 'user@example.com'\nprint(f'Is {email} valid? {is_valid_email(email)}')",
          hint: "Regular expressions use special patterns to match text. The re module helps with this.",
        },
      },
      {
        title: "Simple GUI Applications",
        exercise: {
          description: "Create a simple calculator using tkinter.",
          startingCode: "# Import tkinter\n# Create a simple calculator\n\n",
          solution:
            "import tkinter as tk\n\nwindow = tk.Tk()\nwindow.title('Simple Calculator')\n\nentry = tk.Entry(window)\nentry.pack()\n\ndef calculate():\n    try:\n        result = eval(entry.get())\n        label.config(text=f'Result: {result}')\n    except:\n        label.config(text='Error')\n\nbutton = tk.Button(window, text='Calculate', command=calculate)\nbutton.pack()\n\nlabel = tk.Label(window, text='Result: ')\nlabel.pack()\n\nwindow.mainloop()",
          hint: "Tkinter is Python's standard GUI library. Start with a main window and add widgets.",
        },
      },
    ],
  },
  advanced: {
    title: "Advanced Python",
    chapters: [
      {
        title: "Advanced Object-Oriented Programming",
        exercise: {
          description: "Create a class hierarchy for different types of vehicles with inheritance.",
          startingCode: "# Create Vehicle parent class and Car/Bicycle child classes\n\n",
          solution: "class Vehicle:\n    def __init__(self, name, speed):\n        self.name = name\n        self.speed = speed\n    \n    def move(self):\n        return f'{self.name} is moving at {self.speed} km/h'\n\nclass Car(Vehicle):\n    def __init__(self, name, speed, fuel_type):\n        super().__init__(name, speed)\n        self.fuel_type = fuel_type\n    \n    def honk(self):\n        return 'Beep beep!'\n\nclass Bicycle(Vehicle):\n    def __init__(self, name, speed, has_basket):\n        super().__init__(name, speed)\n        self.has_basket = has_basket\n    \n    def ring_bell(self):\n        return 'Ding ding!'\n\n# Test the classes\ncar = Car('Toyota', 60, 'Petrol')\nbike = Bicycle('Mountain Bike', 15, True)\nprint(car.move())\nprint(car.honk())\nprint(bike.move())\nprint(bike.ring_bell())",
          hint: "Use inheritance to share common attributes and methods between classes."
        }
      },
      {
        title: "Decorators and Generators",
        exercise: {
          description: "Create a decorator to measure the execution time of functions and a generator for Fibonacci numbers.",
          startingCode: "# Create a timing decorator and Fibonacci generator\n\n",
          solution: "import time\n\ndef measure_time(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f'{func.__name__} took {end - start:.2f} seconds')\n        return result\n    return wrapper\n\ndef fibonacci_generator(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\n@measure_time\ndef print_fibonacci(n):\n    for num in fibonacci_generator(n):\n        print(num, end=' ')\n    print()\n\n# Test the code\nprint_fibonacci(10)",
          hint: "Decorators modify function behavior, and generators create iterators efficiently."
        }
      },
      {
        title: "Working with APIs",
        exercise: {
          description: "Create a program that fetches and displays weather data from a weather API.",
          startingCode: "# Use requests to fetch weather data\n# Parse and display the information\n\n",
          solution: "import requests\n\ndef get_weather(city):\n    api_key = 'YOUR_API_KEY'  # Replace with actual API key\n    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'\n    \n    try:\n        response = requests.get(url)\n        data = response.json()\n        \n        if response.status_code == 200:\n            temp = data['main']['temp']\n            weather = data['weather'][0]['description']\n            print(f'Weather in {city}:\n'\n                  f'Temperature: {temp}°C\n'\n                  f'Conditions: {weather}')\n        else:\n            print('Error fetching weather data')\n            \n    except Exception as e:\n        print(f'Error: {e}')\n\n# Test the function\nget_weather('London')",
          hint: "Remember to handle API responses and errors properly."
        }
      },
      {
        title: "Database Operations",
        exercise: {
          description: "Create a simple student database using SQLite to store and retrieve student information.",
          startingCode: "# Create a SQLite database for student records\n\n",
          solution: "import sqlite3\n\ndef setup_database():\n    conn = sqlite3.connect('school.db')\n    cursor = conn.cursor()\n    \n    cursor.execute('''\n        CREATE TABLE IF NOT EXISTS students (\n            id INTEGER PRIMARY KEY,\n            name TEXT NOT NULL,\n            grade INTEGER,\n            subject TEXT\n        )\n    ''')\n    \n    conn.commit()\n    return conn, cursor\n\ndef add_student(cursor, name, grade, subject):\n    cursor.execute('INSERT INTO students (name, grade, subject) VALUES (?, ?, ?)',\n                   (name, grade, subject))\n\ndef get_students(cursor):\n    cursor.execute('SELECT * FROM students')\n    return cursor.fetchall()\n\n# Test the database\nconn, cursor = setup_database()\n\n# Add students\nadd_student(cursor, 'Alice', 95, 'Math')\nadd_student(cursor, 'Bob', 88, 'Science')\nconn.commit()\n\n# Display students\nfor student in get_students(cursor):\n    print(f'ID: {student[0]}, Name: {student[1]}, Grade: {student[2]}, Subject: {student[3]}')\n\nconn.close()",
          hint: "Always commit changes and close connections when done with the database."
        }
      },
      {
        title: "Web Scraping Basics",
        exercise: {
          description: "Create a web scraper to extract book titles and authors from a book website.",
          startingCode: "# Use BeautifulSoup to scrape book information\n\n",
          solution: "import requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_books():\n    url = 'http://books.toscrape.com'\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    \n    books = []\n    for book in soup.select('article.product_pod'):\n        title = book.h3.a['title']\n        price = book.select_one('p.price_color').text\n        books.append({'title': title, 'price': price})\n    \n    return books\n\n# Test the scraper\ntry:\n    books = scrape_books()\n    for book in books[:5]:  # Display first 5 books\n        print(f'Title: {book['title']}\nPrice: {book['price']}\n')\nexcept Exception as e:\n    print(f'Error: {e}')",
          hint: "Be respectful of websites' robots.txt and implement proper error handling."
        }
      },
      {
        title: "Testing Your Code",
        exercise: {
          description: "Write unit tests for a function that validates email addresses.",
          startingCode: "# Create email validator and unit tests\n\n",
          solution: "import re\nimport unittest\n\ndef is_valid_email(email):\n    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'\n    return bool(re.match(pattern, email))\n\nclass TestEmailValidator(unittest.TestCase):\n    def test_valid_emails(self):\n        self.assertTrue(is_valid_email('user@example.com'))\n        self.assertTrue(is_valid_email('user.name@domain.co.uk'))\n        self.assertTrue(is_valid_email('user123@subdomain.domain.com'))\n    \n    def test_invalid_emails(self):\n        self.assertFalse(is_valid_email('invalid.email'))\n        self.assertFalse(is_valid_email('@domain.com'))\n        self.assertFalse(is_valid_email('user@.com'))\n\nif __name__ == '__main__':\n    unittest.main(argv=['first-arg-is-ignored'], exit=False)",
          hint: "Write tests for both valid and invalid cases to ensure thorough testing."
        }
      },
      {
        title: "Advanced Error Handling",
        exercise: {
          description: "Create a custom exception class and implement comprehensive error handling.",
          startingCode: "# Create custom exceptions and error handling\n\n",
          solution: "class InvalidAgeError(Exception):\n    pass\n\nclass Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.set_age(age)\n    \n    def set_age(self, age):\n        try:\n            age = int(age)\n            if age < 0:\n                raise InvalidAgeError('Age cannot be negative')\n            if age > 150:\n                raise InvalidAgeError('Age seems unrealistic')\n            self.age = age\n        except ValueError:\n            raise InvalidAgeError('Age must be a number')\n    \n    def __str__(self):\n        return f'{self.name} is {self.age} years old'\n\n# Test the class\ntry:\n    person1 = Person('Alice', 25)\n    print(person1)\n    \n    person2 = Person('Bob', -5)  # Should raise error\nexcept InvalidAgeError as e:\n    print(f'Error: {e}')\nexcept Exception as e:\n    print(f'Unexpected error: {e}')",
          hint: "Custom exceptions help create more meaningful error messages."
        }
      },
      {
        title: "Multithreading Basics",
        exercise: {
          description: "Create a multithreaded program to download multiple files simultaneously.",
          startingCode: "# Use threading to download files concurrently\n\n",
          solution: "import threading\nimport requests\nimport time\n\ndef download_file(url, filename):\n    try:\n        response = requests.get(url)\n        with open(filename, 'wb') as f:\n            f.write(response.content)\n        print(f'Downloaded {filename}')\n    except Exception as e:\n        print(f'Error downloading {filename}: {e}')\n\n# List of files to download\nfiles = [\n    ('https://example.com/file1.txt', 'file1.txt'),\n    ('https://example.com/file2.txt', 'file2.txt'),\n    ('https://example.com/file3.txt', 'file3.txt')\n]\n\n# Create and start threads\nthreads = []\nfor url, filename in files:\n    thread = threading.Thread(target=download_file, args=(url, filename))\n    thread.start()\n    threads.append(thread)\n\n# Wait for all threads to complete\nfor thread in threads:\n    thread.join()\n\nprint('All downloads completed!')",
          hint: "Use threading for I/O-bound tasks like downloading files."
        }
      },
      {
        title: "Data Analysis with Pandas",
        exercise: {
          description: "Analyze student grades using Pandas and create visualizations.",
          startingCode: "# Use pandas to analyze and visualize student data\n\n",
          solution: "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Create sample data\ndata = {\n    'Student': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],\n    'Math': [95, 80, 85, 70, 90],\n    'Science': [90, 85, 95, 75, 85],\n    'English': [85, 90, 80, 85, 95]\n}\n\n# Create DataFrame\ndf = pd.DataFrame(data)\n\n# Calculate average grades\ndf['Average'] = df[['Math', 'Science', 'English']].mean(axis=1)\n\n# Create visualizations\nplt.figure(figsize=(10, 6))\ndf.plot(x='Student', y=['Math', 'Science', 'English'], kind='bar')\nplt.title('Student Grades by Subject')\nplt.xlabel('Student')\nplt.ylabel('Grade')\nplt.legend(title='Subject')\nplt.tight_layout()\n\n# Display statistics\nprint('Class Statistics:\n')\nprint(df.describe())\n\n# Show the plot\nplt.show()",
          hint: "Use Pandas for data manipulation and Matplotlib for visualization."
        }
      },
      {
        title: "Creating Simple Games",
        exercise: {
          description: "Create a simple text-based adventure game with multiple rooms and items.",
          startingCode: "# Create a text-based adventure game\n\n",
          solution: "class Room:\n    def __init__(self, name, description):\n        self.name = name\n        self.description = description\n        self.exits = {}\n        self.items = []\n\nclass Game:\n    def __init__(self):\n        self.current_room = None\n        self.inventory = []\n        self.setup_game()\n    \n    def setup_game(self):\n        # Create rooms\n        hall = Room('Hall', 'A dark hallway')\n        kitchen = Room('Kitchen', 'A warm kitchen with a pleasant smell')\n        garden = Room('Garden', 'A beautiful garden with flowers')\n        \n        # Set exits\n        hall.exits = {'north': kitchen, 'east': garden}\n        kitchen.exits = {'south': hall}\n        garden.exits = {'west': hall}\n        \n        # Add items\n        hall.items = ['key']\n        kitchen.items = ['cookie']\n        garden.items = ['flower']\n        \n        self.current_room = hall\n    \n    def play(self):\n        while True:\n            print(f'\nYou are in the {self.current_room.name}')\n            print(self.current_room.description)\n            if self.current_room.items:\n                print(f'Items here: {self.current_room.items}')\n            print(f'Exits: {list(self.current_room.exits.keys())}')\n            \n            command = input('What would you like to do? ').lower().split()\n            if not command:\n                continue\n                \n            if command[0] == 'quit':\n                break\n"
        }
      }
    ]
  }
};

function CurriculumDrawer({ open, onClose, onExerciseSelect }) {
  const [expandedModule, setExpandedModule] = React.useState(null);

  const handleModuleClick = (module) => {
    setExpandedModule(expandedModule === module ? null : module);
  };

  const handleExerciseClick = (exercise) => {
    if (onExerciseSelect) {
      onExerciseSelect(exercise);
      onClose();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 320,
          bgcolor: "background.default",
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <MenuBook sx={{ mr: 1 }} />
        <Typography variant="h6">Python Curriculum</Typography>
      </Box>
      <List>
        {Object.entries(curriculum).map(([moduleKey, moduleData]) => (
          <React.Fragment key={moduleKey}>
            <ListItemButton onClick={() => handleModuleClick(moduleKey)}>
              <ListItemText
                primary={moduleData.title}
                sx={{ color: "primary.main" }}
              />
              {expandedModule === moduleKey ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expandedModule === moduleKey} timeout="auto">
              <List component="div" disablePadding>
                {moduleData.chapters.map((chapter, index) => (
                  <ListItem
                    key={index}
                    sx={{ pl: 4 }}
                    button
                    component={ListItemButton}
                    onClick={() => handleExerciseClick(chapter.exercise)}
                  >
                    <ListItemText
                      primary={`${index + 1}. ${chapter.title}`}
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default CurriculumDrawer;
