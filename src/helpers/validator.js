class Validator {
  static emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  static allowedPreferences = [
    "business",
    "entertainment",
    "environment",
    "food",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "tourism",
    "world",
  ];

  /**
   *
   * @param {*} payloadData - user register data
   * @returns
   */
  static registerData(payloadData) {
    let returnData = {
      error: false,
      message: "Validation Successful",
    };

    if (!payloadData.hasOwnProperty("name") || payloadData.name.trim() == "") {
      returnData.error = true;
      returnData.message = "Name required and cannot be empty.";
    } else if (
      !payloadData.hasOwnProperty("email") ||
      payloadData.email.trim() == "" ||
      !Validator.emailRegex.test(payloadData.email)
    ) {
      returnData.error = true;
      returnData.message = "Email required and cannot be empty.";
    } else if (
      !payloadData.hasOwnProperty("password") ||
      payloadData.password.trim() == ""
    ) {
      returnData.error = true;
      returnData.message = "Password required and cannot be empty.";
    } else {
      // allows only 3 keys (name, email, password) throws error more than that
      const payload = Object.keys(payloadData);
      if (payload.length > 3) {
        returnData.error = true;
        returnData.message = "Invalid payload. Additional properties found.";
      }
    }

    return returnData;
  }

  /**
   *
   * @param {*} payloadData - user login data
   * @returns
   */
  static loginData(payloadData) {
    let returnData = {
      error: false,
      message: "Validation Successful",
    };

    if (
      !payloadData.hasOwnProperty("email") ||
      payloadData.email.trim() == "" ||
      !Validator.emailRegex.test(payloadData.email)
    ) {
      returnData.error = true;
      returnData.message = "Email required and cannot be empty.";
    } else if (
      !payloadData.hasOwnProperty("password") ||
      payloadData.password.trim() == ""
    ) {
      returnData.error = true;
      returnData.message = "Password required and cannot be empty.";
    } else {
      // allows only 2 keys (email, password) throws error more than that
      const payload = Object.keys(payloadData);
      if (payload.length > 2) {
        returnData.error = true;
        returnData.message = "Invalid payload. Additional properties found.";
      }
    }

    return returnData;
  }

  /**
   *
   * @param {*} payloadPreferences - user selected preferences
   * @returns
   */
  static validatePreferences(payloadPreferences = []) {
    if (!Array.isArray(payloadPreferences)) {
      return {
        error: true,
        message: "Preferences should be array of elements",
      };
    } else if (!payloadPreferences.length) {
      return {
        error: true,
        message: "Please select atleast one preference",
      };
    }

    let invalidPreferences = [];
    for (const preference of payloadPreferences) {
      if (!Validator.allowedPreferences.includes(preference)) {
        invalidPreferences.push(preference);
      }
    }

    const isError = invalidPreferences.length > 0;
    return {
      error: isError,
      message: !isError
        ? "Preferences are valid."
        : "Invalid preferences found.",
      invalidPreferences: invalidPreferences,
      validPreferences: Validator.allowedPreferences,
    };
  }

  static isValidId(articleId) {
    const hexRegex = /^[0-9a-fA-F]+$/;
    const isError =
      !articleId || typeof articleId !== "string" || !hexRegex.test(articleId);

    return {
      error: isError,
      message: isError ? "Invalid article id" : "Valid article id",
    };
  }

  static isValidKeyword(keyword) {
    // Use a regular expression to check for alphabets, numbers, and spaces
    const regex = /^[a-zA-Z0-9\s]+$/;
    const isError = !regex.test(keyword);

    return {
      error: isError,
      message: isError
        ? "Invalid keyword. Only accepts alphabets, numbers, and spaces"
        : "Valid keyword",
    };
  }
}

module.exports = Validator;
