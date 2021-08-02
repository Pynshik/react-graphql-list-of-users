export let users = [
    {id: 1, name: 'Eshton Kutcher', email: 'eshton@gmail.com', age: 43, social_networks: [{name: "Instagram"}, {name: "Facebook"}]},
    {id: 2, name: 'Kira Nightly', email: 'kiranaightly@mail.ru', age: 32, social_networks: [{name: "Vkontakte"}]},
    {id: 3, name: 'Bradly Kuper', email: 'lovelykuper@mail.ru', age: 45, social_networks: [{name: "Facebook"}, {name: "LinkedIn"}]}
];

export let social_networks = [
    {id: 1, name: "Instagram", users: [ { id: 1, name: 'Eshton Kutcher', email: 'eshton@gmail.com', age: 43 } ]},
    {id: 2, name: "Facebook", users: [ { id: 1, name: 'Eshton Kutcher', email: 'eshton@gmail.com', age: 43 }, {id: 3, name: 'Bradly Kuper', email: 'lovelykuper@mail.ru', age: 45} ]},
    {id: 3, name: "Vkontakte", users: [ {id: 2, name: 'Kira Nightly', email: 'kiranaightly@mail.ru', age: 32} ]},
    {id: 4, name: "LinkedIn", users: [ {id: 3, name: 'Bradly Kuper', email: 'lovelykuper@mail.ru', age: 45} ]}
];
