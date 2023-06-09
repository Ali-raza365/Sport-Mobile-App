function  CheckEvents (events=[],userId=''){
     return events.map((event) => {
          return {
            ...event?._doc,
            isFavorite:  event?._doc?.favorites?.includes(userId),
            isParticipated:  event?._doc?.participants?.includes(userId)
          };
        });
}

module.exports = {
     CheckEvents,
};
