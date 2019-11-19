const dataMongoose = require('mongoose');
const Schema = dataMongoose.Schema;
//dataMongoose.set('debug', true);

const dataSchema = new Schema({
    app_id: { type: String, required: false },
    dev_id: { type: String, required: false },
    hardware_serial: { type: String, required: false },
    port: { type: Number, required: false },
    counter: { type: Number, required: false },
    payload_raw: { type: Schema.Types.Mixed, required: false },
    payload_fields: {
        altitude: { type: Number, required: false },
        battery: { type: Number, required: false },
        hdop: { type: Number, required: false },
        humidity: { type: Number, required: false },
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        sats: { type: Number, required: false },
        temp: { type: Number, required: false },
    },
    metadata: {
        time: { type: Date, required: false },
        frequency: { type: Number, required: false },
        modulation: { type: String, required: false },
        data_rate: { type: String, required: false },
        airtime: { type: Number, required: false },
        coding_rate: { type: String, required: false },
        gateways: [{
            gtw_id: { type: String, required: false },
            gtw_trusted: { type: Boolean, required: false },
            timestamp: { type: Number, required: false },
            time: { type: Date, required: false },
            channel: { type: Number, required: false },
            rssi: { type: Number, required: false },
            snr: { type: Number, required: false },
            rf_chain: { type: Number, required: false },
            latitude: { type: Number, required: false },
            longitude: { type: Number, required: false },
            altitude: { type: Number, required: false }
        }]
    }
}, {collection: 'ButtonStorage'});

dataSchema.set('toJSON', { virtuals: false });

module.exports = dataMongoose.model('ButtonStorage', dataSchema);