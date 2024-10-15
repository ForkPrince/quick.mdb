<h1 align="center">quick.mdb</h1>

<p align="center">A lightweight and easy-to-use MongoDB wrapper inspired by quick.db and beta.mdb</p>

## Overview

`quick.mdb` is a minimalistic tool designed to work similarly to `quick.db`, but with MongoDB as the storage backend. It allows developers to easily perform common database operations such as setting values, pushing to arrays, and importing/exporting data in a key-value format.

## Features

- **Simple key-value storage**: Store and retrieve values using a familiar key-based approach.
- **Array operations**: Push, delete, and manage array elements.
- **Data manipulation**: Add, subtract, and modify numeric values.
- **Prefix-based deletion**: Delete entries matching a specific prefix.
- **JSON import/export**: Seamlessly import and export data in JSON format.
- **Clear all data**: Quickly remove all stored data with a single command.

## Installation

Install via npm:

```bash
npm install @forkprince/quick.mdb
```

## Usage

Here’s how to get started using `quick.mdb`:

```javascript
const { Database } = require("@forkprince/quick.mdb");

const db = new Database("your-mongodb-connection-url");

// Set a value
await db.set("username", "Alice");

// Get a value
const username = await db.get("username");
console.log(username); // Output: Alice

// Push to an array
await db.set("scores", [10, 20]);
await db.push("scores", 30);

// Fetch all data
const allData = await db.fetchAll();
console.log(allData);

// Delete a key
await db.remove("username");

// Clear the database
await db.clear();
```

## API Reference

### `new Database(url)`

Creates a new instance of the `Database` class.

- `url` (string): The MongoDB connection URL.

### `set(key, value)`

Sets a value for the specified key.

- `key` (string): The key to set.
- `value` (mixed): The value to associate with the key.

### `get(key)`

Fetches the value associated with the specified key.

- `key` (string): The key to fetch.
- Returns: The value associated with the key, or `null` if not found.

### `push(key, value)`

Pushes a value to an array stored at the specified key.

- `key` (string): The key associated with the array.
- `value` (mixed): The value to push.

### `fetchAll()`

Retrieves all key-value pairs from the database.

- Returns: An array of objects containing `key` and `value`.

### `remove(key)`

Removes the specified key and its associated value.

- `key` (string): The key to remove.

### `add(key, value)`

Increases a numeric value stored at the specified key.

- `key` (string): The key associated with the numeric value.
- `value` (number): The value to add.

### `subtract(key, value)`

Decreases a numeric value stored at the specified key.

- `key` (string): The key associated with the numeric value.
- `value` (number): The value to subtract.

### `delete(key, value)`

Removes a specific value from an array stored at the specified key.

- `key` (string): The key associated with the array.
- `value` (mixed): The value to delete from the array.

### `deleteKey(key, subKey)`

Deletes a nested key within an object stored at the specified key.

- `key` (string): The key associated with the object.
- `subKey` (string): The nested key to delete.

### `deleteEach(prefix)`

Deletes all entries where the key starts with the specified prefix.

- `prefix` (string): The prefix to match keys against.

### `clear()`

Removes all data from the database.

### `has(key)`

Checks if a key exists in the database.

- `key` (string): The key to check.
- Returns: `true` if the key exists, `false` otherwise.

### `import(file)`

Imports data from a JSON file.

- `file` (string): The file path of the JSON file.

### `export(file)`

Exports all data to a JSON file.

- `file` (string): The file path to export the data to.