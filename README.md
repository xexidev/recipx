Recipe Web App that allows registered users to have a pantry to which they can add products and ingredients manually or by barcode, and then generate, by setting parameters of tastes and styles, recipes with artificial intelligence using the OpenAI API. It is free and allows to generate 25 recipes per user per week.

Front End:
Made with React, the Auth system and the requests to the database where the products are stored are made with Supabase.

Back End:
Made with NodeJS and Express, it handles the requests to the OpenAI API and the management, also in Supabase, of the credits of registered users.