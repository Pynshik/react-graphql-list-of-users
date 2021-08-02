import { users, social_networks } from "./db.js";

const resolvers = {
    Query: {
        users() {
            return users
        },
        user(parent, {id}) {
            const user = users.find(user => user.id === +id);
            if(!user) throw new Error("User not found");
            return user;
        },
        social_networks() {
            return social_networks;
        },
        social_network(parent, {id}) {
            const social_network = social_networks.find(network => network.id === +id);
            if(!social_network) throw new Error("Social network not found");
            return social_network;
        }
    },
    Mutation: {
        addUser(parent, args) {
            const newUser = {name: args.name, email: args.email, age: args.age};
            newUser.id = Date.parse(new Date());
            if(args.social_network) {
                const existNetwork = social_networks.find(network => {
                    return network.name === args.social_network
                });
                if(existNetwork){
                    existNetwork.users.push(newUser);
                } else {
                    const newNetwork = {name: args.social_network, users: [newUser]};
                    newNetwork.id = Date.parse(new Date());
                    social_networks.push(newNetwork);
                }
                newUser.social_networks = [{name: args.social_network}];
            }
            users.push(newUser);
            return newUser;
        },

        async updateUser(parent, args) {
            let newUser = await users.find(user => user.id === +args.id);
            if(newUser){

                if(args.social_network){
                    const networkName = args.social_network;
                    delete args.social_network;
                    newUser.social_networks ? await newUser.social_networks.push({name: networkName}) : newUser.social_networks = [{name: networkName}];
            
                    for(let prop in args){
                        newUser[prop] = args[prop];
                    }

                    const existNetwork = await social_networks.find(network => network.name === networkName);

                    if(existNetwork) {
                        const userIndex = await existNetwork.users.findIndex(user => user.id === +args.id);
                        if(userIndex !== -1) await existNetwork.users.splice(userIndex, 1, newUser);
                        else await existNetwork.users.push(newUser);
                    } else {
                        const newNetwork = {name: networkName, users: [newUser]};
                        newNetwork.id = Date.parse(new Date());
                        await social_networks.push(newNetwork);
                    }

                } else {
                    for(let prop in args){
                        newUser[prop] = args[prop];
                    }
                }

                for(let i = 0; i < social_networks.length; i++) {
                    const userIndex = await social_networks[i].users.findIndex(user => user.id === +args.id);
                    if(userIndex !== -1) await social_networks[i].users.splice(userIndex, 1, newUser);
                }

                newUser.id = +args.id;
                return newUser;

            } else throw new Error("User not found.");
        },

        deleteUser(parent, args) {
            const userIndex = users.findIndex(user => user.id === +args.id);
            if (userIndex === -1) throw new Error("User not found.");
            const deletedUser = users.splice(userIndex, 1)[0];

            for(let i = 0; i < social_networks.length; i++) {
                const userIndex = social_networks[i].users.findIndex(user => user.id === +args.id);
                if(userIndex !== -1) social_networks[i].users.splice(userIndex, 1);
            }

            return deletedUser;
        },

        addNetwork(parent, args) {
            const newNetwork = {name: args.name, users: []};
            newNetwork.id = Date.parse(new Date());
            social_networks.push(newNetwork);
            return newNetwork;
        },

        updateNetwork(parent, args) {
            const newNetwork = social_networks.find(network => network.id === +args.id);
            if(newNetwork){
                for(let i = 0; i < users.length; i++){
                    const networkIndex = users[i].social_networks.findIndex(network => network.name === newNetwork.name);
                    if(networkIndex !== -1) users[i].social_networks.splice(networkIndex, 1, {name: args.name});
                }
                newNetwork.name = args.name;

                return newNetwork;

            } else throw new Error('Network not found');
            
        },

        deleteNetwork(parent, args) {
            const networkIndex = social_networks.findIndex(network => network.id === +args.id);
            if(networkIndex === -1) throw new Error("Network not found");
            const deletedNetwork = social_networks.splice(networkIndex, 1)[0];

            for(let i = 0; i < users.length; i++) {
                const networkIndex = users[i].social_networks.findIndex(network => network.name === deletedNetwork.name);
                if(networkIndex !== -1) users[i].social_networks.splice(networkIndex, 1);
            }

            return deletedNetwork;
        }
    }
};

export default resolvers;
