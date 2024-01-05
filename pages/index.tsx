import styles from '../public/styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {Runner} from "../models/runner";
import {DataGrid} from '@mui/x-data-grid';
import {mapPersonalBests} from "./api/stravaPRConverter";
import {compareRunTime} from "../utils/compare.util";
import Head from "next/head";

export default function Home() {
  const [runners, setRunners] = useState<Runner[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/runnerData');
      const data = await res.json();

      setRunners(data);
      setRunners((runners: Runner[]) => [...runners, mapPersonalBests()])

    }

    fetchData().then(() => console.log(runners));
  }, [runners]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', type: 'number', flex: 1 },
    { field: '1500', headerName: '1500m', flex: 1, sortComparator: compareRunTime },
    { field: '3000', headerName: '3000m', flex: 1,sortComparator: compareRunTime,},
    { field: '5000', headerName: '5000m', flex: 1, sortComparator: compareRunTime, },
    { field: '10000', headerName: '10000m', flex: 1, sortComparator: compareRunTime, },
    { field: '21097', headerName: '21097m', flex: 1, sortComparator: compareRunTime, },
    { field: '42195', headerName: '42195', width: 120, sortComparator: compareRunTime, },
  ];

  const rows = runners.map((runner: Runner) => ({
    id: runner.id,
    name: runner.name,
    age: runner.age,
    "1500": runner.personalBests[0]?.timeString,
    "3000": runner.personalBests[1]?.timeString,
    "5000": runner.personalBests[2]?.timeString,
    "10000": runner.personalBests[3]?.timeString,
    "21097": runner.personalBests[4]?.timeString,
    "42195": runner.personalBests[5]?.timeString
  }))

  return (
    <>
      <Head>
        <title>Persebasen</title>
      </Head>
      <main className={styles.main}>
        <DataGrid rows={rows} columns={columns} pageSize={20} style={{ height: 600, width: '100%' }}/>
      </main>
    </>
  )
}
