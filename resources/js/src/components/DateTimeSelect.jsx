import React, { useState } from "react";
import DatePicker, { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { registerLocale, setDefaultLocale } from "react-multi-date-picker";
import fr from "date-fns/locale/fr";
//registerLocale("fr", fr);
//setDefaultLocale("fr");

const monthList = {
    January: "Janvier",
    February: "Février",
    March: "Mars",
    April: "Avril",
    May: "Mai",
    June: "Juin",
    July: "Juillet",
    August: "Aout",
    September: "Septembre",
    October: "Octobre",
    November: "Novembre",
    December: "Décembre",
};
const weekDays = ["Dim", "Lun", "Ma", "Mer", "Jeu", "Ven", "Sa"];
const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];
const DateTimeSelect = ( {setDates = () =>{}}) => {
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const [values, setValues] = useState([]);

    const onChange = (dates) => {
        console.log(dates)
        const tab = dates.map((date) => {
            //console.log(date.toDate())
            //console.log(date.toString())
            let str = date.toString();
            str = str.split(" ")
            return {
                date:str[0],
                time:str[1]
            }
        })

        console.log(tab)
        setDates(tab)
        setValues(dates)
    }
    return (
        <Calendar
            multiple
            value={values}
            onChange={onChange}
            format="YYYY-MM-DD HH:mm:ss"
            weekDays={weekDays}
            months={months}
            
            //locale={fr}
            plugins={[
                <DatePanel header="Dates ajoutées" />,
                <TimePicker position="bottom" months={months} hideSeconds />,
            ]}
        />
    );
};

export default DateTimeSelect;
