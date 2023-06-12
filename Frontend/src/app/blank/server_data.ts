export const SERVER_DATA = [
  {
    "type": "text",
    "name": "firstName",
    "validators": {
      "required": true
    },
    "ui": {
      "label": "First Name",
      "placeholder": "Enter Your First Name",
      "class": ["form-control-lg"]
    }
  },
  {
    "type": "select",
    "name": "country",
    "ui": {
      "label": "Country",
      "placeholder": "Select..."
    },
    "validators": {
      "required": true
    },
    "source": [
      {
        "value": 1,
        "text": "India"
      },
      {
        "value": 2,
        "text": "Canada"
      },
      {
        "value": 1,
        "text": "USA"
      }
    ]
  },
  {
    "type": "select",
    "name": "state",
    "validators": {
      "required": { "conditionalExpression": "x => x.country != undefined && x.country != null" }
    },
    "ui": {
      "label": "State",
      "placeholder": "Select..."
    },
    "modelName": "state",
    "filter": [
      {
        "value": 1,
        "text": "Gujarat",
        "countryId": 1
      },
      {
        "value": 2,
        "text": "Ontario",
        "countryId": 2
      },
      {
        "value": 3,
        "text": "Massachusetts",
        "countryId": 3
      }
    ]
  },
  {
    "type": "textarea",
    "name": "permanentAddress",
    "ui": {
      "label": "Permanent Address",
      "placeholder": "Enter Your Permanent Address"
    }
  },
  {
    "type": "checkbox",
    "name": "sameAsPermanent",
    "modelName": "sameAsAddress",
    "source": [
      {
        "value": 1,
        "text": "Same As Permanent"
      }
    ]
  },
  {
    "type": "textarea",
    "name": "correspondenceAddress",
    "ui": {
      "label": "Correspondence Address",
      "placeholder": "Enter Your Correspondence Address"
    }
  }
]
