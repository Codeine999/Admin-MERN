import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
    {
        productId: String,
        yearlySaleTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number,
            },
        ],
        dailyData: {
            date: String,
            totalSales: Number,
            totalUnits: Number,
        },
    },
    { timeseries: true }
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);

export default ProductStat;