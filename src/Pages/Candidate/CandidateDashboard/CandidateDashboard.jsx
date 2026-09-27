import { useEffect } from "react";
import {
  FaBriefcase,
  FaClipboardList,
  FaEye,
  FaSearch,
  FaUserTie,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/CandidateDashboard";
import StatCardSkeleton from "../../../components/LoadingSkeleton/StatCardSkeleton";
import StatItem from "../../../components/StatItem/StatItem";
import { getMyApplications } from "../../../features/applications/applicationsSlice";

/**
 * CandidateDashboard Component
 * Main dashboard view for candidates showing application stats and quick actions
 *
 * Features:
 * - Welcome message with candidate name
 * - Summary stats: total applications, applications by status
 * - Quick links to Browse Jobs and My Applications
 * - Card-based layout for dashboard stats
 *
 * @see Requirements: 17.2 - Candidate dashboard access
 */
const CandidateDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { applications, totalApplications, isLoading } = useSelector(
    (store) => store.applications,
  );

  // Fetch applications on mount to get current stats
  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  // Calculate application stats by status
  const getStatusCounts = () => {
    const counts = {
      applied: 0,
      reviewing: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    applications.forEach((app) => {
      if (counts.hasOwnProperty(app.status)) {
        counts[app.status]++;
      }
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  // Stats cards configuration
  const statsCards = [
    {
      title: "Total Applications",
      count: totalApplications,
      icon: <FaBriefcase />,
      color: "#2ecc71",
      bcg: "#d5f5e3",
    },
    {
      title: "Under Review",
      count: statusCounts.reviewing,
      icon: <FaEye />,
      color: "#f39c12",
      bcg: "#fef9e7",
    },
    {
      title: "Interviews",
      count: statusCounts.interview,
      icon: <FaUserTie />,
      color: "#9b59b6",
      bcg: "#f5eef8",
    },
  ];

  // Status breakdown for detailed view
  const statusBreakdown = [
    { status: "applied", label: "Applied", count: statusCounts.applied },
    { status: "reviewing", label: "Reviewing", count: statusCounts.reviewing },
    { status: "interview", label: "Interview", count: statusCounts.interview },
    { status: "offer", label: "Offer", count: statusCounts.offer },
    { status: "rejected", label: "Rejected", count: statusCounts.rejected },
  ];

  return (
    <Wrapper>
      {/* Welcome Header */}
      <div className="dashboard-header">
        <h2 className="welcome-text">Welcome, {user?.name || "Candidate"}!</h2>
        <p className="subtitle">
          Track your job applications and discover new opportunities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {isLoading ? (
          <StatCardSkeleton count={3} />
        ) : (
          statsCards.map((stat, index) => <StatItem key={index} {...stat} />)
        )}
      </div>

      {/* Application Status Breakdown */}
      <div className="status-breakdown">
        <h4>Applications by Status</h4>
        <div className="status-list">
          {statusBreakdown.map(({ status, label, count }) => (
            <div key={status} className={`status-item ${status}`}>
              <span className="status-label">{label}</span>
              <span className="status-count">{isLoading ? "-" : count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h4>Quick Actions</h4>
        <div className="actions-container">
          <Link to="/jobs" className="action-link">
            <FaSearch />
            Browse Jobs
          </Link>
          <Link to="/candidate/applications" className="action-link secondary">
            <FaClipboardList />
            My Applications
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default CandidateDashboard;
