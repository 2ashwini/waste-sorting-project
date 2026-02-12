import SanitationReport from '../models/SanitationReport';

interface AreaAnalytics {
    area: string;
    cleanlinessScore: number;
    riskProbability: number;
    complaintCount: number;
    trend: 'improving' | 'stable' | 'declining';
}

export const getSanitationAnalytics = async (): Promise<AreaAnalytics[]> => {
    try {
        // Get all reports
        const reports = await SanitationReport.find();

        // Group by location (extract area from location string)
        const areaMap = new Map<string, any[]>();

        reports.forEach(report => {
            // Extract area (e.g., "Area A" from "Area A, Street 5")
            const areaMatch = report.location.match(/Area [A-Z]/i);
            const area = areaMatch ? areaMatch[0] : 'Other';

            if (!areaMap.has(area)) {
                areaMap.set(area, []);
            }
            areaMap.get(area)!.push(report);
        });

        // Calculate analytics for each area
        const analytics: AreaAnalytics[] = [];

        areaMap.forEach((areaReports, area) => {
            const complaintCount = areaReports.length;

            // Calculate cleanliness score (inverse of complaint severity)
            const severityScores = { 'Low': 10, 'Medium': 20, 'High': 30 };
            const totalSeverity = areaReports.reduce((sum, r) => sum + severityScores[r.severity], 0);
            const avgSeverity = complaintCount > 0 ? totalSeverity / complaintCount : 0;
            const cleanlinessScore = Math.max(0, 100 - avgSeverity * 2);

            // Calculate risk probability based on recent complaints
            const recentReports = areaReports.filter(r => {
                const daysSince = (Date.now() - r.timestamp.getTime()) / (1000 * 60 * 60 * 24);
                return daysSince <= 7; // Last 7 days
            });
            const riskProbability = Math.min(100, recentReports.length * 15);

            // Determine trend (simplified)
            const trend = cleanlinessScore >= 75 ? 'improving' :
                cleanlinessScore >= 60 ? 'stable' : 'declining';

            analytics.push({
                area,
                cleanlinessScore: Math.round(cleanlinessScore),
                riskProbability: Math.round(riskProbability),
                complaintCount,
                trend
            });
        });

        // If no data, return mock data
        if (analytics.length === 0) {
            return [
                { area: 'Area A', cleanlinessScore: 75, riskProbability: 35, complaintCount: 12, trend: 'improving' },
                { area: 'Area B', cleanlinessScore: 60, riskProbability: 55, complaintCount: 28, trend: 'declining' },
                { area: 'Area C', cleanlinessScore: 85, riskProbability: 20, complaintCount: 5, trend: 'stable' },
                { area: 'Area D', cleanlinessScore: 70, riskProbability: 40, complaintCount: 15, trend: 'improving' },
                { area: 'Area E', cleanlinessScore: 55, riskProbability: 65, complaintCount: 35, trend: 'declining' },
            ];
        }

        return analytics.sort((a, b) => a.area.localeCompare(b.area));
    } catch (error) {
        console.error('Error calculating analytics:', error);
        throw error;
    }
};
