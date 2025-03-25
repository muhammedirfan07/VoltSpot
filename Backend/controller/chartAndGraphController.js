const evstations = require("../Models/evChargingStationModel");
const users = require("../Models/UserModal");

exports.getChartData = async (req, res) => {
  console.log("Inside getChartData...📊📊");

  try {
    // Fetch total number of users and stations
    const totalUsers = await users.countDocuments({role:"users"});
    const totalStations = await evstations.countDocuments({});

    // Fetch daily data for new users
    const dailyUserData = await users.aggregate([
      {
        $match: {
          createdAt: { $type: "date" }, // Ensure createdAt is a valid date
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          newUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
      {
        $project: {
          day: "$_id",
          newUsers: 1,
        },
      },
    ]).exec();

    console.log("dailyUserData before exec", dailyUserData);

    // Fetch daily data for new stations
    const dailyStationData = await evstations.aggregate([
      {
        $match: {
          createdAt: { $type: "date" }, // Ensure createdAt is a valid date
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          newStations: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
      {
        $project: {
          day: "$_id",
          newStations: 1,
        },
      },
    ]).exec();

    console.log("dailyStationData before exec", dailyStationData);

    // Combine the daily data for users and stations
    const combinedDailyData = dailyUserData.map((userDay) => {
      const matchingStationDay = dailyStationData.find(
        (stationDay) => stationDay.day === userDay.day
      );
      return {
        day: userDay.day,
        newUsers: userDay.newUsers,
        newStations: matchingStationDay ? matchingStationDay.newStations : 0,
      };
    });

    // Ensure all days are represented, even if there are no stations for a day
    const allDays = new Set(combinedDailyData.map(data => data.day));
    dailyStationData.forEach(stationDay => {
      if (!allDays.has(stationDay.day)) {
        combinedDailyData.push({
          day: stationDay.day,
          newUsers: 0,
          newStations: stationDay.newStations,
        });
      }
    });

    // Sort the combined data by day
    combinedDailyData.sort((a, b) => a.day.localeCompare(b.day));

    // Log intermediate results for debugging
    console.log("dailyUserData", dailyUserData);
    console.log("dailyStationData", dailyStationData);
    console.log("combinedDailyData", combinedDailyData);

    res.status(200).json({
      totalUsers,
      totalStations,
      weeklyData: combinedDailyData,
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};