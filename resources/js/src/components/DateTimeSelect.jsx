import React, { useState } from "react";
import DatePicker, { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { registerLocale, setDefaultLocale } from "react-multi-date-picker";
import fr from "date-fns/locale/fr";
//registerLocale("fr", fr);
//setDefaultLocale("fr");
import { addDays, isBefore, startOfToday } from "date-fns";
import '../assets/css/datepicker.css'

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
const DateTimeSelect = ({values, setValues, setDates = () => {} }) => {
    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const onChange = (dates) => {
        //console.log(dates);
        const currentDate = new Date();
        const hier = new Date(currentDate);
        hier.setDate(currentDate.getDate() - 1);
        let valideDates = []
        let valideListe = []
        const tab = dates.map((date) => {
            if (hier < date.toDate()) {
                valideDates = [...valideDates, date]
                let str = date.toString();
                str = str.split(" ");
                valideListe = [...valideListe,{
                    date: str[0],
                    //time:str[1]
                }]
                return {
                    date: str[0],
                    //time:str[1]
                };
            }
            //console.log(currentDate <= date.toDate());
            //console.log(date.toString())
        });

        //console.log(tab);
        setDates(valideListe);
        setValues(valideDates);
    };
    const disablePastDates = (date) => {
        console.log(date);
        const currentDate = new Date();
        return date > currentDate;
    };
    return (
        <Calendar
            className="green"
            multiple
            value={values}
            onChange={onChange}
            format="YYYY-MM-DD"
            //format="YYYY-MM-DD HH:mm:ss"
            weekDays={weekDays}
            months={months}
            //disabled={disablePastDates}

            //locale={fr}
            plugins={[
                <DatePanel header="Dates ajoutées" />,
                //<TimePicker position="bottom" months={months} hideSeconds />,
            ]}
        />
    );
};

export default DateTimeSelect;
