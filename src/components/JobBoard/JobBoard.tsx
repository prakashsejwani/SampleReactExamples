import { useState, useEffect, useRef } from 'react';
import './JobBoard.scss';

const JOBS_PER_PAGE = 6;
const JOB_IDS_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
const JOB_DETAILS_URL = 'https://hacker-news.firebaseio.com/v0/item';

interface Job {
  id: number;
  title: string;
  url?: string;
  by: string;
  time: number;
}

export default function JobBoard() {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchedPagesRef = useRef(new Set<number>());

  useEffect(() => {
    fetch(JOB_IDS_URL)
      .then((res) => res.json())
      .then((data) => setJobIds(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!jobIds.length) return;
    if (fetchedPagesRef.current.has(page)) return;
    fetchedPagesRef.current.add(page);

    const fetchJobs = async () => {
      setLoading(true);
      const start = page * JOBS_PER_PAGE;
      const end = start + JOBS_PER_PAGE;
      const idsToFetch = jobIds.slice(start, end);

      const jobDetailsPromises = idsToFetch.map(async (jobId) => {
        const res = await fetch(`${JOB_DETAILS_URL}/${jobId}.json`);
        return res.json();
      });

      const newJobs = await Promise.all(jobDetailsPromises);
      setJobs((prevJobs) => {
        const existingIds = new Set(prevJobs.map((job) => job.id));
        const uniqueNewJobs = newJobs.filter((job) => !existingIds.has(job.id));
        return [...prevJobs, ...uniqueNewJobs];
      });
      setLoading(false);
    };

    fetchJobs();
  }, [page, jobIds]);

  const hasMoreJobs = (page + 1) * JOBS_PER_PAGE < jobIds.length;

  return (
    <div className="job-board-container">
      <h1>HN Job Board</h1>

      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-card">
            <h3>
              {job.url ? (
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              ) : (
                job.title
              )}
            </h3>
            <div className="job-meta">
              <span>By <strong>{job.by}</strong></span>
              <span>•</span>
              <span>{new Date(job.time * 1000).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <span>Fetching latest roles...</span>
        </div>
      )}

      {hasMoreJobs && !loading && (
        <button className="load-more-btn" onClick={() => setPage((p) => p + 1)}>
          Load More Jobs
        </button>
      )}
    </div>
  );
}