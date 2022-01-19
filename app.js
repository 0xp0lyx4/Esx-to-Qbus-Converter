const fs = require('fs');

var code = ``;//Your esx lua code is here!

code = code.replaceAll(`TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)`, `TriggerEvent('QBCore:GetObject', function(obj) QBCore = obj end)`);
code = code.replaceAll(`while ESX == nil do`, `while QBCore == nil do`);
code = code.replaceAll(`ESX.TriggerServerCallback`, `QBCore.Functions.TriggerCallback`);
code = code.replaceAll(`ESX.Game.GetVehicleProperties`, `QBCore.Functions.GetVehicleProperties`);
code = code.replaceAll(`ESX.Game.DeleteVehicle`, `QBCore.Functions.DeleteVehicle`);
code = code.replaceAll(`ESX.Game.SpawnVehicle`, `QBCore.Functions.SpawnVehicle`);
code = code.replaceAll(`ESX.Game.GetClosestVehicle`, `QBCore.Functions.GetClosestVehicle`);
code = code.replaceAll(`ESX =					nil`, `QBCore = nil `);
code = code.replaceAll(`ESX = nil`, `QBCore = nil `);
code = code.replaceAll(`RegisterNetEvent('esx:playerLoaded')`, `RegisterNetEvent('QBCore:Client:OnPlayerLoaded')`);
code = code.replaceAll(`AddEventHandler('esx:playerLoaded',`, `AddEventHandler('QBCore:Client:OnPlayerLoaded',`);
code = code.replaceAll(`RegisterNetEvent('esx:setJob')`, `RegisterNetEvent('QBCore:Client:OnJobUptade')`);
code = code.replaceAll(`AddEventHandler('esx:setJob',`, `AddEventHandler('QBCore:Client:OnJobUptade', `);
code = code.replaceAll(`RegisterNetEvent('esx:onPlayerDeath')`, `RegisterNetEvent('QBCore:Client:OnPlayerUnload')`);
code = code.replaceAll(`AddEventHandler('esx:onPlayerDeath',`, `AddEventHandler('QBCore:Client:OnPlayerUnload',`);
code = code.replaceAll(`ESX.Game.GetClosestPlayer()`, `QBCore.Functions.GetClosestPlayer()`);
code = code.replaceAll(`ESX.UI.Menu.Open`, `QBCore.UI.Menu.Open`);
code = code.replaceAll(`ESX.UI.Menu.CloseAll()`, `QBCore.UI.Menu.CloseAll()`);
code = code.replaceAll(`xPlayer.getInventoryItem`, `xPlayer.Functions.GetItemByName `);
code = code.replaceAll(`RegisterNetEvent('esx:setJob')`, `RegisterNetEvent('QBCore:Client:OnJobUpdate')`);
code = code.replaceAll(`AddEventHandler('esx:setJob', function(job)`, `AddEventHandler('QBCore:Client:OnJobUpdate', function(job)`);
code = code.replaceAll(`xPlayer.removeAccountMoney('bank', amount)`, `ply.Functions.AddMoney('bank', amount, "Bank depost")`);
code = code.replaceAll(`xPlayer.addMoney(amount)`, `ply.Functions.RemoveMoney('cash', amount, "Bank depost")`);
code = code.replaceAll(`xPlayer.getAccount('bank').money`, `ply.PlayerData.money["bank"]`);
code = code.replaceAll(`xPlayer.removeInventoryItem `, `xPlayer.Functions.RemoveItem `);
code = code.replaceAll(`xPlayer.addInventoryItem`, `xPlayer.Functions.AddItem`);
code = code.replaceAll(`ESX.GetPlayerFromId`, `QBCore.Functions.GetPlayer`);
code = code.replaceAll(`ESX.GetPlayerFromIdentifier`, `QBCore.Functions.GetPlayerByCitizenId`);
code = code.replaceAll(`ESX.Math.Trim(value)`, `QBCore.Functions.MathTrim`);
code = code.replaceAll(`ESX.GetPlayerData()`, `QBCore.Functions.GetPlayerData()`);
code = code.replaceAll(`ESX.RegisterUsableItem()`, `QBCore.Functions.CreateUseableItem()`);
code = code.replaceAll(`xPlayer.removeMoney(money)`, `Player.Functions.RemoveMoney()`);
code = code.replaceAll(`ESX.RegisterServerCallback()`, `QBCore.Functions.CreateCallback()`);
code = code.replaceAll(`ESX.TriggerServerCallback()`, `QBCore.Functions.TriggerCallback()`);
code = code.replaceAll(`ESX.RegisterServerCallback("system:fetchStatus", function(source, cb)
local src = source
local user = ESX.GetPlayerFromId(src)


local fetch = [[
     SELECT
          skills
     FROM
          users
     WHERE
          identifier = @identifier
]]

MySQL.Async.fetchScalar(fetch, {
     ["@identifier"] = user.identifier

}, function(status)

     if status ~= nil then
          cb(json.decode(status))
     else
          cb(nil)
     end

end)
end)`, `QBCore.Functions.CreateCallback('system:fetchStatus', function(source, cb)
local Player = QBCore.Functions.GetPlayer(source)

 if Player then
       exports['ghmattimysql']:execute('SELECT skills FROM players WHERE citizenid = @citizenid', {
           ['@citizenid'] = Player.PlayerData.citizenid
      }, function(status)
          if status ~= nil then
               cb(json.decode(status))
          else
               cb(nil)
          end
      end)
 else
      cb()
 end
end)`);
code = code.replaceAll(`RegisterCommand `, `QBCore.Commands.Add()`);
code = code.replaceAll(`local user = ESX.GetPlayerFromId(src)`, `local Player = QBCore.Functions.GetPlayer(source)`);
code = code.replaceAll(`["@identifier"] = user.identifier`, `['@citizenid'] = Player.PlayerData.citizenid`);


fs.writeFile('output.lua', code, function (err) {
    if (err) return console.log(err);
  });

console.log('Conversion Successful!');