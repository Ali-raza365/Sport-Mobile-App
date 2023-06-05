import { create } from "zustand";
import { CREATE_EVENT_API, GET_ACTIVITY_API, GET_EVENTS_API } from "../api/apis";
import { _gotoAuthStack, _gotoHomeNavigator } from "../navigation/navigationServcies";
import { handleAxiosError } from "../utils/ErrorHandler";

const EventStore = create((set) => ({

    Activites: [],
    Events: [],
    selectedActivity: null,
    createEvent_loading: false,
    setActivity: (avtivity) => set({
        selectedActivity: avtivity
    }),

    fetchActivites: async (token) => {
        try {
            await GET_ACTIVITY_API(token).then((resp) => {
                // console.log(resp.data)
                if (resp?.data) {
                    set({ Activites: resp?.data?.activities, })
                } else {
                    handleAxiosError(resp.data)
                }
            }).catch((err) => {
                handleAxiosError(err)
            })
        } catch (error) {
            handleAxiosError(error)
        }
    },
    fetchEvents: async (token) => {
        try {
            await GET_EVENTS_API(token).then((resp) => {
                // console.log(resp.data)
                if (resp?.data) {
                    set({ Events: resp?.data?.events, })
                } else {
                    handleAxiosError(resp.data)
                }
            }).catch((err) => {
                handleAxiosError(err)
            })
        } catch (error) {
            handleAxiosError(error)
        }
    },

    createEventFuc: async (detail, token) => {
        try {

            set({ createEvent_loading: true })
            console.log(detail.image)
            const form = new FormData();
            form.append("organizer", detail.organizer)
            form.append("image", { uri: detail?.image?.uri, name: detail?.image?.fileName, type: detail?.image?.type })
            form.append("title", detail.title)
            form.append("description", detail.description)
            form.append("participants", detail.participants)
            form.append("date", detail.date)
            form.append("time", detail.time)
            form.append("location", JSON.stringify(detail.location))
            form.append("activity", JSON.stringify(detail.activity))
            await CREATE_EVENT_API(form, token).then((resp) => {
                set({ createEvent_loading: false })
                if (resp?.data) {
                 alert(resp?.data?.msg)
                } else {
                    handleAxiosError(resp.data)
                }
            }).catch((err) => {
                set({ createEvent_loading: false })
                handleAxiosError(err)
            })
        } catch (error) {
            set({ createEvent_loading: false })
            handleAxiosError(error)
        }
    }


}))

export default EventStore