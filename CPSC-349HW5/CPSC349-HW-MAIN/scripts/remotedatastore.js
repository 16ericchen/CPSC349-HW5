(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var fd = firebase.firestore();
    class RemoteDataStore {
        constructor() {
        }
        add(key, val) {
            return fd.collection("coffeeorders").data(key).set({
                coffee: val.coffee,
                email: key,
                size: val.size,
                flavor: val.flavor,
                strength: val.strength
            });
        }
        getAll() {
            var dict = {};
            fd.collection("coffeeorders").get().then(function (data) {
                data.forEach(function (data) {
                    dict[data.id] = data.data();
                    console.log(data.id, " => ", data.data());
                });
            });
            return dict;
        }
        get(key) {
            var dataRef = fd.collection("coffeeorders").data(key);
            return dataRef.get();
        }
        remove(key) {
            return fd.collection("coffeeorders").data(key).delete().then(function () {
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        }
        initChecklist(checklist) {
            fd.collection("coffeeorders").get().then(function (data) {
                data.forEach(function (data) {
                    checklist.addRow.call(checklist, data.data());
                });
            });
        }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
  })(window);