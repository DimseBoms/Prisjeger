
//Tore Broberg, formatet på logger configen er hentet fra winston dokumentasjonen: https://github.com/winstonjs/winston
import winston from 'winston'
// FORMAT: dato;klokkeslett;brukernavn;beskrivelse av hendelse
const logConfig = {
    'transports': [
        new winston.transports.File({
        filename: 'loggInfo.log', 
    
        })
    ],
    format: winston.format.combine( 
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )
}

const logger = winston.createLogger(logConfig);
export default logger;

