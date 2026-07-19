const {randomChoice} = require("../utils/Random");

const CONTENT_LIBRARY = {

    welcomeTitles: [

        "Welcome Back",
        "Sign In",
        "Login To Your Account",
        "Access Your Account",
        "Welcome",
        "Good To See You Again"

    ],

    emailLabels: [

        "Email",
        "Email Address",
        "Username",
        "User Email"

    ],

    passwordLabels: [

        "Password",
        "Passcode",
        "Account Password",
        "Security Password"

    ],

    loginButtons: [

        "Login",
        "Sign In",
        "Continue",
        "Access Account"

    ],

    registerButtons: [

        "Register",
        "Create Account",
        "Sign Up",
        "Join Now"

    ],

    submitButtons: [

        "Submit",
        "Send",
        "Save",
        "Continue"

    ],

    saveButtons: [

        "Save",
        "Update",
        "Apply Changes",
        "Save Settings"

    ],

    deleteButtons: [

        "Delete",
        "Remove",
        "Erase",
        "Discard"

    ],

    resetButtons: [

        "Reset",
        "Clear",
        "Restore",
        "Reset Form"

    ],

    cancelButtons: [

        "Cancel",
        "Back",
        "Dismiss",
        "Close"

    ],

    errorMessages: [

        "Invalid Email",
        "Password Is Required",
        "Login Failed",
        "Incorrect Credentials",
        "Something Went Wrong",
        "Try Again"

    ]

};

function replaceText(node, replacements) {

    if (!node.text) {

        return;

    }

    const value = node.text.toLowerCase();

    Object.entries(replacements).forEach(([key, options]) => {

        if (value.includes(key)) {

            const replacement = randomChoice(options);

            node.text = replacement;
            node.name = replacement;

        }

    });

}

function randomizeContent(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return design;

    }

    const replacements = {

        "welcome": CONTENT_LIBRARY.welcomeTitles,

        "email": CONTENT_LIBRARY.emailLabels,

        "password": CONTENT_LIBRARY.passwordLabels,

        "login": CONTENT_LIBRARY.loginButtons,

        "register": CONTENT_LIBRARY.registerButtons,

        "submit": CONTENT_LIBRARY.submitButtons,

        "save": CONTENT_LIBRARY.saveButtons,

        "delete": CONTENT_LIBRARY.deleteButtons,

        "reset": CONTENT_LIBRARY.resetButtons,

        "cancel": CONTENT_LIBRARY.cancelButtons,

        "invalid": CONTENT_LIBRARY.errorMessages,

        "failed": CONTENT_LIBRARY.errorMessages,

        "error": CONTENT_LIBRARY.errorMessages

    };

    design.nodes.forEach(node => {

        replaceText(node, replacements);

    });

    return design;

}

module.exports = randomizeContent;