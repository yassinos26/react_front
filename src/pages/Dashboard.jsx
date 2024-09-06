import React from 'react';
import { Box, Grid, Paper, Typography, IconButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SyncIcon from '@mui/icons-material/Sync';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  { name: 'Aug', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Sep', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Oct', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Nov', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Dec', uv: 1890, pv: 4800, amt: 2181 }
];

const pieData = [
  { name: 'Desktop', value: 63 },
  { name: 'Tablet', value: 15 },
  { name: 'Phone', value: 22 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f0f2f5' }}>
      <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
        {/* Top row cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">BUDGET</Typography>
            <Typography variant="h4">$24k</Typography>
            <Typography color="textSecondary">12% Since last month</Typography>
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">TOTAL CUSTOMERS</Typography>
            <Typography variant="h4">1.6k</Typography>
            <Typography color="textSecondary">16% Since last month</Typography>
            <PeopleIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">TASK PROGRESS</Typography>
            <Typography variant="h4">75.5%</Typography>
            <AssignmentTurnedInIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">TOTAL PROFIT</Typography>
            <Typography variant="h4">$15k</Typography>
            <MonetizationOnIcon sx={{ fontSize: 40, color: '#3f51b5' }} />
          </Paper>
        </Grid>

        {/* Sales chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Sales</Typography>
              <IconButton><SyncIcon /></IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Traffic source pie chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Traffic source</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box display="flex" justifyContent="center" mt={2}>
              <Box mx={2} display="flex" alignItems="center">
                <Box width={12} height={12} bgcolor="#0088FE" mr={1} />
                <Typography>Desktop</Typography>
              </Box>
              <Box mx={2} display="flex" alignItems="center">
                <Box width={12} height={12} bgcolor="#00C49F" mr={1} />
                <Typography>Tablet</Typography>
              </Box>
              <Box mx={2} display="flex" alignItems="center">
                <Box width={12} height={12} bgcolor="#FFBB28" mr={1} />
                <Typography>Phone</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
