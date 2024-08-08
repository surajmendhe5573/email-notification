# Contact API Endpoint

This API endpoint allows users to submit a contact form, which sends an email to the specified email address.

## API Endpoint



### Contact
- **URL:** `http://localhost:3000/contact`
- **Method:** `POST`
- **Description:** Handles contact form submissions and sends an email with the submitted details..
**Request Body:**

The request body should be in JSON format and include the following fields:
- `name` (string): The name of the person submitting the form.
- `email` (string): The email address of the person submitting the form.
- `message` (string): The message/content of the contact form.

**Example Request:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "message": "Hello, this is a test message!"
}
```


## Set Up Environment Variables

Create a `.env` file in the root directory of your project and add your environment variables. Below is an example `.env` file:

**Example `.env` file:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
PORT=3000

