import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Search,
  MapPin,
  Building,
  Eye,
  ChevronDown,
} from "lucide-react";
import { mockJobs } from "../utils/mockJobs";

const JobListings = () => {
  const user = localStorage.getItem("user");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jobApplication");
    navigate("/");
  };

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "all" || job.location.includes(locationFilter);
    const matchesType = typeFilter === "all" || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  const locations = [
    ...new Set(
      mockJobs.map((job) => job.location.split(",")[1]?.trim() || job.location)
    ),
  ];
  const types = [...new Set(mockJobs.map((job) => job.type))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Job Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, <strong>{user}</strong>
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative w-full md:w-48">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="text-gray-700">
                  {locationFilter === "all" ? "All locations" : locationFilter}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {isLocationOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setLocationFilter("all");
                        setIsLocationOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All locations
                    </button>
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setLocationFilter(location);
                          setIsLocationOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative w-full md:w-48">
              <button
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="text-gray-700">
                  {typeFilter === "all" ? "All types" : typeFilter}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {isTypeOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setTypeFilter("all");
                        setIsTypeOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All types
                    </button>
                    {types.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setTypeFilter(type);
                          setIsTypeOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.type === "Full-time"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {job.type}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {job.salary}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {job.company}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>
                <Link to={`/jobs/${job.id}`}>
                  <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No jobs found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
