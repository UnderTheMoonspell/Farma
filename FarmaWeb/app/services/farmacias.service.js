﻿(function () {
    'use strict';

    angular.module('FarmaciaApp').factory('farmaciasService', FarmaciasService);

    FarmaciasService.$inject = ['$http', '$filter', 'config'];
    function FarmaciasService($http, $filter, config) {
        var vm = this;
        var farmaciasAPI = {
            getAll: getAllFarmacias,
            getClientType: getClientType,
            getZone: getZone,
            getFarmaciaById: getFarmaciaById,
            createFarmacia: createFarmacia,
            editFarmacia: editFarmacia
        };

        return farmaciasAPI;

        function getAllFarmacias(params) {
            return $http({
                method: 'GET',
                url: config.apiURL + '/farmacia?start=' + params.start + '&number='
                    + params.number + '&sortField=' + params.sortField + '&sortDir=' + params.sortDir
            }).then(function (response) {
                return response.data;
            }).catch(function (response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return "Aconteceu um erro inesperado na ligação ao servidor";
                }
                return response.data.errorMessage;
            });
        }

        function getClientType() {
            var list =
                [
                    {
                        id: 1,
                        text: 'Banca'
                     },
                    {
                        id: 2,
                        text: 'Saude'
                    }
                ]
            return list;
        }

        function getZone() {
            var list =
                [
                    {
                        id: 1,
                        text: 'Continente'
                   , clientType: "Banca" },
                    {
                        id: 2,
                        text: 'Ilhas'
                   , clientType: "Banca" },
                    {
                        id: 3,
                        text: 'PALOP'
                   , clientType: "Banca" },
                    {
                        id: 4,
                        text: 'Internacional'
                    }
                ]
            return list;
        }

        function getFarmaciaById(id) {
            return $http({
                method: 'GET',
                url: config.apiURL + '/farmacia/' + id
            });
            //return $filter('filter')(vm.list, { Id: id })[0];
        }

        function createFarmacia(farmacia) {
            return $http({
                method: 'POST',
                url: config.apiURL + '/farmacia/',
                data: farmacia
            });
        }

        function editFarmacia(id, farmacia) {
            return $http({
                method: 'POST',
                url: config.apiURL + '/farmacia/' + id,
                data: farmacia
            });
        }
    }
})();