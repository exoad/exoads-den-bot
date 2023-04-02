// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const superagent = require("superagent");
module.exports = {
  config: {
    name: "random",
    category: "Fun",
    description: "Random stuffs",
    usage:
      "1 argument accepted of any in [bank,blood,apliance,app,credit,code,coffee,company,crypto,computer,color,device,food,name,id,vehicle,nation,phone]",
    aliases: ["rnd"],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config
  ) => {
    let toChoice = args[0];
    if (toChoice == "bank") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/bank/random_bank"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Bank")
        .addFields({
          name: "Account",
          value: body.account_number, inline: true,
        })
        .addFields({ name: "IBAN", value: body.iban, inline: true })
        .addFields({ name: "Bank", value: body.bank_name, inline: true })
        .addFields({ name: "Routing", value: body.routing_number, inline: true })
        .addFields({ name: "BIC (Swift)", value: body.swift_bic, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "blood") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/blood/random_blood"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Blood Type")
        .addFields({ name: "Type", value: body.type, inline: true })
        .addFields({ name: "RH Factor", value: body.rh_factor, inline: true })
        .addFields({ name: "Group", value: body.group, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "credit") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/business_credit_card/random_card"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Credit Card")
        .addFields({ name: "Number", value: body.credit_card_number, inline: true })
        .addFields({ name: "Expiration", value: body.credit_card_expiry_date, inline: true })
        .addFields({ name: "Type", value: body.credit_card_type, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "code") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/code/random_code"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Code")
        .addFields({ name: "NPI", value: body.npi, inline: true })
        .addFields({ name: "ISBN", value: body.isbn, inline: true })
        .addFields({ name: "EAN", value: body.ean, inline: true })
        .addFields({ name: "RUT", value: body.rut, inline: true })
        .addFields({ name: "NRIC", value: body.nric, inline: true })
        .addFields({ name: "IMEI", value: body.imei, inline: true })
        .addFields({ name: "ASIN", value: body.asin, inline: true })
        .addFields({ name: "SIN", value: body.sin, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "coffee") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/coffee/random_coffee"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Coffee")
        .addFields({ name: "Blend", value: body.blend_name, inline: true })
        .addFields({ name: "Origin", value: body.origin, inline: true })
        .addFields({ name: "Variety Name", value: body.variety, inline: true })
        .addFields({ name: "Feel", value: body.notes, inline: true })
        .addFields({ name: "Intensifier", value: body.intensifier, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "company") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/company/random_company"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Company")
        .addFields({ name: "Name", value: body.business_name, inline: true })
        .addFields({ name: "Suffix", value: body.suffix, inline: true })
        .addFields({ name: "Industry Focus", value: body.industry, inline: true })
        .addFields({ name: "Catch Phrase", value: body.catch_phrase, inline: true })
        .addFields({ name: "Buzz Word", value: body.buzzword, inline: true })
        .addFields({
          name: "Company Statement",
          value: body.bs_company_statement, inline: true,
        })
        .addFields({
          name: "Emplyee ID Number",
          value: body.employee_identification_number, inline: true,
        })
        .addFields({ name: "DUNS", value: body.duns_number, inline: true })
        .setThumbnail(`${body.logo}`)
        .addFields({ name: "Type", value: body.type, inline: true })
        .addFields({ name: "Phone", value: body.phone_number, inline: true })
        .addFields({
          name: "Address + Latitude Longitude",
          value: `${body.full_address}\n**Latitude** ${body.latitude}\n**Longitude** ${body.longitude}`,inline: true
        })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "crypto") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/crypto/random_crypto"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Crypto")
        .addFields({ name: "MD5", value: body.md5, inline: true })
        .addFields({ name: "SHA1", value: body.sha1, inline: true })
        .addFields({ name: "SHA256", value: body.sha256, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "computer") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/computer/random_computer"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Computer/PC")
        .addFields({ name: "Platform", value: body.platform, inline: true })
        .addFields({ name: "Type", value: body.type, inline: true })
        .addFields({ name: "OS", value: body.os, inline: true })
        .addFields({ name: "Stack", value: body.stack, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "color") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/color/random_color"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Color")
        .addFields({ name: "HEX", value: body.hex_value, inline: true })
        .addFields({ name: "Proper Name", value: body.color_name , inline: true});

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "device") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/device/random_device"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Device")
        .addFields({ name: "Manufacturer", value: body.manufacturer, inline: true })
        .addFields({ name: "Model", value: body.model, inline: true })
        .addFields({ name: "Platform", value: body.platform, inline: true })
        .addFields({ name: "Build", value: body.build_number, inline: true })
        .addFields({ name: "Serial Number", value: body.serial_number, inline: true })
        .addFields({ name: "Version", value: body.version, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "food") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/food/random_food"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Food")
        .addFields({ name: "Name", value: body.dish, inline: true })
        .addFields({ name: "Description", value: body.description, inline: true })
        .addFields({
          name: "Ingredients & Measurement",
          value: `${body.ingredient}\n${body.measurement}`, inline: true
        })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "name") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/name/random_name"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Name")
        .addFields({ name: "Name", value: body.name, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "id") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/id_number/random_id_number"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random ID")
        .addFields({ name: "Valid SSN", value: body.valid_us_ssn, inline: true })
        .addFields({ name: "Invalid", value: body.invalid_us_ssn, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "vehicle") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/vehicle/random_vehicle"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Vehicle")
        .addFields({ name: "Make", value: body.make_and_model, inline: true })
        .addFields({ name: "Color", value: body.color, inline: true })
        .addFields({ name: "Transmission", value: body.transmission, inline: true })
        .addFields({ name: "Drive", value: body.drive_type, inline: true })
        .addFields({ name: "Fuel Usage Type", value: body.fuel_type, inline: true })
        .addFields({ name: "Car Type", value: body.car_type, inline: true })
        .addFields({ name: "Car Options", value: body.car_options, inline: true })
        .addFields({ name: "Specifications", value: body.specs, inline: true })
        .addFields({ name: "Door(s) Count", value: body.doors, inline: true })
        .addFields({ name: "Mileage", value: body.mileage, inline: true })
        .addFields({ name: "Kilometrage", value: body.kilometrage, inline: true })
        .addFields({ name: "License", value: body.license_plate, inline: true })
        .addFields({ name: "VIN", value: body.vin, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "nation") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/nation/random_nation"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Nation")
        .addFields({ name: "Nationality", value: body.nationality, inline: true })
        .addFields({ name: "Language", value: body.language, inline: true })
        .addFields({ name: "Capital", value: body.capital, inline: true })
        .addFields({ name: "National Sport", value: body.national_sport, inline: true })
        .addFields({ name: "Flag", value: body.flag, inline: true })
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "number") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/number/random_number"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Numbers")
        .addFields({ name: "Number", value: body.number, inline: true })
        .addFields({ name: "Leading Zero", value: body.leading_zero_number, inline: true })
        .addFields({ name: "Decimal", value: body.decimal, inline: true })
        .addFields({ name: "Normal", value: body.normal, inline: true })
        .addFields({ name: "Hexa", value: body.hexadecimal, inline: true })
        .addFields({ name: "Positive", value: body.positive, inline: true })
        .addFields({ name: "Negative", value: body.negative, inline: true })
        .addFields({ name: "Non Zero", value: body.non_zero_number, inline: true })
        .addFields({ name: "Digit", value: body.digit , inline: true});

      msg.channel.send({ embeds: [embed] });
    } else if (toChoice == "phone") {
      const { body } = await superagent.get(
        "https://random-data-api.com/api/phone_number/random_phone_number"
      );
      const embed = new EmbedBuilder()
        .setTitle("Random Phone Number")
        .addFields({ name: "Number", value: body.phone_number, inline: true })
        .addFields({ name: "Cell", value: body.cell_phone, inline: true })
        .addFields({ name: "Cell (e614)", value: body.cell_phone_in_e164 , inline: true});

      msg.channel.send({ embeds: [embed] });
    }
  },
};
