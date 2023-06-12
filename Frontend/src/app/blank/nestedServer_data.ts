export const SERVER_DATA = {
  'data': [
    {
      name: 'personal.name',
      type: 'text',
      ui: {
        label: 'Name',
        viewMode: {
          advance: {
            div: ["col-md-6", "col-sm-6"]
          }
        }
      }
    },
    {
      name: 'personal.age',
      type: 'number',
      ui: {
        label: 'Age',
        viewMode: {
          advance: {
            div: ["col-md-6", "col-sm-6"]
          }
        }
      }
    },
    {
      name: 'address.number',
      type: 'text',
      ui: {
        label: 'House No.',
        viewMode: {
          advance: {
            div: ["col-md-3", "col-sm-3"]
          }
        }
      }
    },
    {
      name: 'address.colony',
      type: 'text',
      ui: {
        label: 'Colony Name',
        viewMode: {
          advance: {
            div: ["col-md-9", "col-sm-9"]
          }
        }
      }
    }

  ],
  'uiBinding': ["personalSection", "addressSection"],
  'dynamicFormConfiguration': {
    additionalConfig: [
      {
        type: 'card',
        name: 'addressSection',
        childrens: [
          {
            type: 'card-header',
            props:
            {
              text: 'Address'
            }
          },
          {
            type: 'card-body',
            childrens: [['address.number', 'address.colony']]
          }
        ],
        skipDefaultView: true
      },
      {
        type: 'card',
        name: 'personalSection',
        childrens: [
          {
            type: 'card-header',
            props:
            {
              text: 'Personal Details'
            }
          },
          {
            type: 'card-body',
            childrens: [['personal.name', 'personal.age']]
          }
        ],
        skipDefaultView: true
      },
    ]
  }
}
