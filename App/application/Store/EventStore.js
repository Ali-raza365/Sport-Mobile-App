import { create } from "zustand";
import { ADD_FAVOURITE_EVENTS_API, CREATE_EVENT_API, GET_ACTIVITY_API, GET_EVENTS_API, GET_EVENTS_BY_LOCATION_API, GET_RECOMMENDED_EVENTS_API, PARTICIPATE_EVENT_API, REMOVE_FAVOURITE_EVENTS_API, SEARCH_EVENT_API } from "../api/apis";
import { _gotoAuthStack, _gotoHomeNavigator } from "../navigation/navigationServcies";
import { handleAxiosError } from "../utils/ErrorHandler";

const EventStore = create((set) => ({

    Activites: [],
    Events: [],
    nearMeEvents:[],
    EventLocation:null,
    Recommandedevents: [],
    Searchevents: null,
    selectedActivity: null,
    createEvent_loading: false,
    setActivity: (avtivity) => set({
        selectedActivity: avtivity
    }),
    setEventLocation: (location) => set({
        EventLocation: location
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
    fetchEvents: async (data, token) => {
        try {
            let resp = await GET_EVENTS_API(data, token)
            // console.log(resp.data) 
            if (resp?.data) {
                set({ Events: resp?.data?.events, })
                return resp?.data?.events
            } else {
                handleAxiosError(resp.data)
            }

        } catch (error) {
            handleAxiosError(error)
        }
    },
    fetchRecommendedEvents: async (data, token) => {
        try {
            const resp = await GET_RECOMMENDED_EVENTS_API(data, token)
            // console.log(resp.data)
            if (resp?.data) {
                set({ Recommandedevents: resp?.data?.events, })
                return resp?.data?.events || []
            } else {
                handleAxiosError(resp.data)
            }
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
            form.append("max_participants", detail.participants)
            form.append("date", detail.date)
            form.append("time", detail.time)
            form.append("location", JSON.stringify(detail.location))
            form.append("activity", JSON.stringify(detail.activity))
            const resp = await CREATE_EVENT_API(form, token)
            set({ createEvent_loading: false })
            if (resp?.data) {
                alert(resp?.data?.msg)
            } else {
                handleAxiosError(resp.data)
                set({ createEvent_loading: false })

            }
            return resp
        } catch (error) {
            set({ createEvent_loading: false })
            handleAxiosError(error)
        }
    },
    AddEventToFavorite: async (detail, token) => {
        try {
            const resp = await ADD_FAVOURITE_EVENTS_API(detail, token)
            if (resp?.data) {
                console.log(resp?.data?.message);
            } else {
                handleAxiosError(resp.data)
            }
        } catch (error) {
            handleAxiosError(error)
        }
    },
    RemoveEventFromFavorite: async (detail, token) => {
        try {
            const resp = await REMOVE_FAVOURITE_EVENTS_API(detail, token)
            if (resp?.data) {
                console.log(resp?.data?.message);
            } else {
                handleAxiosError(resp.data)
            }
        } catch (error) {
            handleAxiosError(error)
        }
    },
    ParticipateEvents: async (detail, token) => {
        try {
            const resp = await PARTICIPATE_EVENT_API(detail, token)
            if (resp?.data?.message) {
                return resp?.data?.message
            } else {
                handleAxiosError(resp.data)
            }
        } catch (error) {
            handleAxiosError(error)
        }
    },
    FetchSearchEvents: async (detail, token) => {
        try {
            const resp = await SEARCH_EVENT_API(detail, token)
            if (resp?.data) {
                set({ Searchevents: resp?.data?.events })
                return resp?.data?.events
            } else {
                handleAxiosError(resp.data)
            }
        } catch (error) {
            handleAxiosError(error)
        }
    },
    fetchEventsByLocation: async (data, token) => {
        try {
            let resp = await GET_EVENTS_BY_LOCATION_API(data, token)
            // console.log(resp.data) 
            if (resp?.data) {
                set({ nearMeEvents: resp?.data?.events, })
            } else {
                handleAxiosError(resp.data)
            }
            return resp?.data?.events ||null
        } catch (error) {
            handleAxiosError(error)
        }
    },

}))

export default EventStore