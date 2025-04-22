import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  LocalMall,
  Star,
  Whatshot,
  MonetizationOn,
  Category,
  ThumbUp,
  Equalizer,
  ShoppingCart,
  Person,
  ArrowUpward,
  ArrowDownward,
  Info,
  FilterList,
  Refresh,
  AttachMoney,
  People,
  Timeline,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShoppingBasket,
  Favorite,
  Inventory
} from '@mui/icons-material';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar, LineChart, Line,
  ScatterChart, Scatter, ZAxis, AreaChart, Area
} from 'recharts';
import productsData from '../sports_products.json';

// Custom components
const MetricCard = ({ icon, value, label, trend, theme }) => (
  <Paper sx={{
    p: 3,
    height: '100%',
    borderRadius: 4,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
    }
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box sx={{
        p: 1.5,
        mr: 2,
        borderRadius: 3,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white'
      }}>
        {icon}
      </Box>
      <Typography variant="subtitle2" sx={{
        color: 'text.secondary',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: '0.75rem'
      }}>
        {label}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Typography variant="h4" sx={{
        fontWeight: 700,
        mr: 1,
        background: `linear-gradient(45deg, ${theme.palette.text.primary} 0%, ${theme.palette.text.secondary} 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}>
        {typeof value === 'number' ? value.toFixed(value % 1 === 0 ? 0 : 1) : value}
      </Typography>
      {trend && (
        <Typography variant="body2" sx={{
          color: trend > 0 ? theme.palette.success.main : theme.palette.error.main,
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.75rem'
        }}>
          {trend > 0 ? <ArrowUpward fontSize="inherit" /> : <ArrowDownward fontSize="inherit" />} 
          {Math.abs(trend)}%
        </Typography>
      )}
    </Box>
  </Paper>
);

const TopProductsTable = ({ products }) => {
  const topProducts = [...products]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 5);

  return (
    <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Top Rated Products</Typography>
        <IconButton size="small">
          <FilterList fontSize="small" />
        </IconButton>
      </Box>
      {topProducts.map((product, index) => (
        <Box key={product.id} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar 
              src={product.image} 
              alt={product.title} 
              sx={{ width: 40, height: 40, mr: 2 }}
              variant="rounded"
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                {product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {product.category}
              </Typography>
            </Box>
            <Chip 
              label={`${product.rating.rate} ★`} 
              size="small" 
              color="primary" 
              sx={{ ml: 1 }}
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(product.rating.rate / 5) * 100} 
            sx={{ height: 4, borderRadius: 2 }}
            color="primary"
          />
        </Box>
      ))}
    </Paper>
  );
};

const CategorySalesChart = ({ data }) => {
  return (
    <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Category Performance</Typography>
        <Tooltip title="Sales distribution by category">
          <Info fontSize="small" color="action" />
        </Tooltip>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const PriceRatingScatter = ({ products }) => {
  const data = products.map(product => ({
    x: product.price,
    y: product.rating.rate,
    z: product.rating.count,
    name: product.title,
    category: product.category,
    fill: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  return (
    <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Price vs. Rating</Typography>
        <Tooltip title="Bubble size represents number of ratings">
          <Info fontSize="small" color="action" />
        </Tooltip>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis type="number" dataKey="x" name="Price" unit="$" />
          <YAxis type="number" dataKey="y" name="Rating" domain={[0, 5]} />
          <ZAxis type="number" dataKey="z" name="Review Count" range={[50, 500]} />
          <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name, props) => {
            if (name === 'Price') return [`$${value}`, name];
            if (name === 'Rating') return [value, name];
            return [value, name];
          }} />
          <Scatter name="Products" data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>
  );
};

const ProductPerformanceTable = ({ products }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Product Performance</Typography>
        <Box>
          <IconButton size="small" sx={{ mr: 1 }}>
            <FilterList fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <Refresh fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Reviews</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={product.image} alt={product.title} sx={{ width: 40, height: 40, mr: 2 }} variant="rounded" />
                    <Typography variant="subtitle2">{product.title}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Star fontSize="small" color="warning" sx={{ mr: 0.5 }} />
                    {product.rating.rate.toFixed(1)}
                  </Box>
                </TableCell>
                <TableCell align="right">{product.rating.count}</TableCell>
                <TableCell align="right">
                  <Chip 
                    label={product.isBestSeller ? 'Best Seller' : product.isTrending ? 'Trending' : 'Regular'} 
                    size="small" 
                    color={product.isBestSeller ? 'success' : product.isTrending ? 'warning' : 'default'} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const SalesAnalytics = ({ products }) => {
  const salesData = [...new Set(products.map(p => p.category))].map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    const totalSales = categoryProducts.reduce((sum, p) => sum + (p.price * (p.rating.count / 10)), 0);
    return {
      name: category,
      sales: totalSales,
      items: categoryProducts.length,
      fill: `hsl(${Math.random() * 360}, 70%, 50%)`
    };
  });

  const monthlySales = [
    { month: 'Jan', sales: 3200, orders: 142 },
    { month: 'Feb', sales: 4200, orders: 198 },
    { month: 'Mar', sales: 3800, orders: 165 },
    { month: 'Apr', sales: 5100, orders: 231 },
    { month: 'May', sales: 4900, orders: 215 },
    { month: 'Jun', sales: 6200, orders: 284 },
    { month: 'Jul', sales: 5800, orders: 263 },
  ];

  return (
    <Grid container spacing={3}>
      <Grid  xs={12} md={8}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Monthly Sales</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip label="+18.5% vs last period" size="small" color="success" sx={{ mr: 1 }} />
              <IconButton size="small">
                <FilterList fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke={useTheme().palette.primary.main} 
                fill={useTheme().palette.primary.light}
                strokeWidth={2}
                name="Sales ($)"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke={useTheme().palette.secondary.main}
                strokeWidth={2}
                name="Orders"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid  xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Sales by Category</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="sales"
                label={({ name, percent }) => `${name}: $${(percent * 10000).toFixed(0)}`}
              >
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Sales']} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid  xs={12}>
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Top Selling Products</Typography>
          <Grid container spacing={2}>
            {products
              .sort((a, b) => (b.price * (b.rating.count / 10)) - (a.price * (a.rating.count / 10)))
              .slice(0, 4)
              .map(product => (
                <Grid  xs={12} sm={6} md={3} key={product.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Avatar src={product.image} alt={product.title} sx={{ width: 80, height: 80, mb: 2 }} variant="rounded" />
                        <Typography variant="subtitle1" gutterBottom>
                          {product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Star fontSize="small" color="warning" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">{product.rating.rate.toFixed(1)}</Typography>
                        </Box>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                          ${(product.price * (product.rating.count / 10)).toFixed(2)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Estimated Sales
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const CustomerInsights = ({ products }) => {
  // Simulated customer data
  const customers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', orders: 12, value: 1245.50, lastPurchase: '2023-07-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', orders: 8, value: 876.25, lastPurchase: '2023-07-10' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', orders: 15, value: 2103.75, lastPurchase: '2023-07-12' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', orders: 5, value: 543.90, lastPurchase: '2023-06-28' },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', orders: 20, value: 2987.60, lastPurchase: '2023-07-14' },
  ];

  const customerSegments = [
    { name: 'High Value', value: 15, fill: '#4CAF50' },
    { name: 'Medium Value', value: 35, fill: '#2196F3' },
    { name: 'Low Value', value: 50, fill: '#FFC107' },
  ];

  const purchaseHistory = [
    { month: 'Jan', purchases: 120 },
    { month: 'Feb', purchases: 180 },
    { month: 'Mar', purchases: 150 },
    { month: 'Apr', purchases: 210 },
    { month: 'May', purchases: 190 },
    { month: 'Jun', purchases: 240 },
    { month: 'Jul', purchases: 220 },
  ];

  return (
    <Grid container spacing={3}>
      <Grid  xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Top Customers</Typography>
          <List>
            {customers.map(customer => (
              <ListItem key={customer.id} secondaryAction={
                <Chip label={`$${customer.value.toFixed(2)}`} color="primary" size="small" />
              }>
                <ListItemAvatar>
                  <Avatar>{customer.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={customer.name}
                  secondary={`${customer.orders} orders | Last: ${customer.lastPurchase}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid  xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Customer Segments</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              innerRadius="20%"
              outerRadius="100%"
              data={customerSegments}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RadialBar>
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              <RechartsTooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid  xs={12}>
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Purchase History</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={purchaseHistory}>
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="purchases" fill="#8884d8" radius={[4, 4, 0, 0]}>
                {purchaseHistory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 50}, 70%, 50%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

const AdvancedAnalytics = () => {
  const performanceData = [
    { name: 'Page Views', value: 12500, change: 12.5 },
    { name: 'Conversion Rate', value: 3.2, change: 2.1 },
    { name: 'Avg. Order Value', value: 85.50, change: -1.2 },
    { name: 'Customer Retention', value: 42.3, change: 5.7 },
  ];

  const funnelData = [
    { name: 'Visits', value: 10000 },
    { name: 'Add to Cart', value: 4500 },
    { name: 'Checkout', value: 2500 },
    { name: 'Purchase', value: 1500 },
  ];

  return (
    <Grid container spacing={3}>
      <Grid  xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Performance Metrics</Typography>
          <Grid container spacing={2}>
            {performanceData.map((metric, index) => (
              <Grid  xs={12} sm={6} key={index}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">{metric.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mr: 1 }}>
                      {typeof metric.value === 'number' ? 
                        (metric.name === 'Conversion Rate' || metric.name === 'Customer Retention') ? 
                        `${metric.value}%` : metric.value.toLocaleString() 
                        : metric.value}
                    </Typography>
                    <Chip 
                      label={`${metric.change > 0 ? '+' : ''}${metric.change}%`} 
                      size="small" 
                      color={metric.change > 0 ? 'success' : 'error'}
                      variant="outlined"
                      icon={metric.change > 0 ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid  xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Conversion Funnel</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={funnelData}
              margin={{ left: 30 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <RechartsTooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid  xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Customer Acquisition</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { name: 'Jan', organic: 4000, paid: 2400 },
                { name: 'Feb', organic: 3000, paid: 1398 },
                { name: 'Mar', organic: 2000, paid: 9800 },
                { name: 'Apr', organic: 2780, paid: 3908 },
                { name: 'May', organic: 1890, paid: 4800 },
                { name: 'Jun', organic: 2390, paid: 3800 },
                { name: 'Jul', organic: 3490, paid: 4300 },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="paid" stroke="#FF5722" strokeWidth={2} />
              <Line type="monotone" dataKey="organic" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid  xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Traffic Sources</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Direct', value: 400 },
                  { name: 'Social', value: 300 },
                  { name: 'Email', value: 200 },
                  { name: 'Referral', value: 200 },
                  { name: 'Organic', value: 500 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                <Cell fill="#4CAF50" />
                <Cell fill="#2196F3" />
                <Cell fill="#FFC107" />
                <Cell fill="#FF5722" />
                <Cell fill="#9C27B0" />
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [products, setProducts] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProducts(productsData.products);
      setLoading(false);
    }, 1000);
  }, []);

  // Core metrics
  const metrics = {
    totalProducts: products.length,
    bestSellers: products.filter(p => p.isBestSeller).length,
    trending: products.filter(p => p.isTrending).length,
    avgPrice: products.length ? (products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0,
    avgRating: products.length ? (products.reduce((sum, p) => sum + p.rating.rate, 0) / products.length) : 0,
    categories: [...new Set(products.map(p => p.category))].length,
    totalRevenue: products.reduce((sum, p) => sum + (p.price * (p.rating.count / 10)), 0),
    conversionRate: 3.2 // Simulated conversion rate
  };

  // Chart data
  const categoryDistribution = [...new Set(products.map(p => p.category))]
    .map(cat => ({
      name: cat,
      value: products.filter(p => p.category === cat).length,
      sales: products.filter(p => p.category === cat).reduce((sum, p) => sum + (p.price * (p.rating.count / 10)), 0),
      fill: `hsl(${Math.random() * 360}, 70%, 50%)`
    }));

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    name: `${stars} Star${stars > 1 ? 's' : ''}`,
    value: products.filter(p => Math.round(p.rating.rate) === stars).length,
    fill: theme.palette.primary.main
  }));

  const priceDistribution = [
    { range: '$0-$50', count: products.filter(p => p.price <= 50).length },
    { range: '$50-$100', count: products.filter(p => p.price > 50 && p.price <= 100).length },
    { range: '$100-$150', count: products.filter(p => p.price > 100 && p.price <= 150).length },
    { range: '$150+', count: products.filter(p => p.price > 150).length }
  ];

  const salesTrendData = [
    { name: 'Jan', value: 3200 },
    { name: 'Feb', value: 4200 },
    { name: 'Mar', value: 3800 },
    { name: 'Apr', value: 5100 },
    { name: 'May', value: 4900 },
    { name: 'Jun', value: 6200 },
    { name: 'Jul', value: 5800 },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 3 }}>Loading Dashboard...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6, maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h3" sx={{
              fontWeight: 800,
              mb: 1,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.5px',
              fontSize: isMobile ? '2rem' : '2.5rem',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              Sports Analytics Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'text.secondary',
              maxWidth: 600,
              textAlign: isMobile ? 'center' : 'left'
            }}>
              Comprehensive insights and performance metrics for your sports product inventory
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: isMobile ? 2 : 0, mx: isMobile ? 'auto' : 0 }}>
            <IconButton sx={{ mr: 1 }}>
              <Refresh />
            </IconButton>
            <Tabs 
              value={timeRange} 
              onChange={(e, newValue) => setTimeRange(newValue)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                '& .MuiTab-root': {
                  minWidth: 'unset',
                  padding: '6px 12px',
                  fontSize: '0.75rem'
                }
              }}
            >
              <Tab label="Week" value="week" />
              <Tab label="Month" value="month" />
              <Tab label="Quarter" value="quarter" />
              <Tab label="Year" value="year" />
            </Tabs>
          </Box>
        </Box>
      </Box>

      {/* Metrics Cards */}
      <Box sx={{ mb: 6, maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3}>
          <Grid  xs={12} sm={6} md={4} lg={2}>
            <MetricCard 
              icon={<LocalMall />} 
              value={metrics.totalProducts} 
              label="Total Products" 
              trend={5.2} 
              theme={theme}
            />
          </Grid>
          <Grid  xs={12} sm={6} md={4} lg={2}>
            <MetricCard 
              icon={<Star />} 
              value={metrics.bestSellers} 
              label="Best Sellers" 
              trend={12.7} 
              theme={theme}
            />
          </Grid>
          <Grid  xs={12} sm={6} md={4} lg={2}>
            <MetricCard 
              icon={<Whatshot />} 
              value={metrics.trending} 
              label="Trending Now" 
              trend={8.4} 
              theme={theme}
            />
          </Grid>
          <Grid  xs={12} sm={6} md={4} lg={2}>
            <MetricCard 
              icon={<MonetizationOn />} 
              value={`$${metrics.avgPrice.toFixed(2)}`} 
              label="Avg. Price" 
              trend={-2.1} 
              theme={theme}
            />
          </Grid>
          <Grid  xs={12} sm={6} md={4} lg={2}>
            <MetricCard 
              icon={<ThumbUp />} 
              value={metrics.avgRating.toFixed(1)} 
              label="Avg. Rating" 
              trend={1.5} 
              theme={theme}
            />
          </Grid>
          <Grid  xs={12} sm={6} md={4} lg={2}>
            <MetricCard 
              icon={<Category />} 
              value={metrics.categories} 
              label="Categories" 
              trend={3.8} 
              theme={theme}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          <Tab label="Overview" icon={<BarChartIcon />} />
          <Tab label="Products" icon={<ShoppingBasket />} />
          <Tab label="Sales" icon={<AttachMoney />} />
          <Tab label="Customers" icon={<People />} />
          <Tab label="Analytics" icon={<Timeline />} />
        </Tabs>

        {tabValue === 0 && (
          <Grid container spacing={3}>
            {/* First Row */}
            <Grid  xs={12} md={8}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Sales Trend</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip label="+12.5% vs last period" size="small" color="success" sx={{ mr: 1 }} />
                    <IconButton size="small">
                      <FilterList fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={salesTrendData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={theme.palette.primary.main} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Sales ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid  xs={12} md={4}>
              <TopProductsTable products={products} />
            </Grid>

            {/* Second Row */}
            <Grid  xs={12} md={6}>
              <CategorySalesChart data={categoryDistribution} />
            </Grid>
            <Grid  xs={12} md={6}>
              <PriceRatingScatter products={products} />
            </Grid>

            {/* Third Row */}
            <Grid  xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Category Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid  xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Rating Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart
                    innerRadius="20%"
                    outerRadius="100%"
                    data={ratingDistribution}
                    startAngle={180}
                    endAngle={-180}
                  >
                    <RadialBar
                      minAngle={15}
                      label={{ position: 'insideStart', fill: '#fff' }}
                      background
                      clockWise
                      dataKey="value"
                    >
                      {ratingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </RadialBar>
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                    <RechartsTooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid  xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Price Distribution</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priceDistribution}>
                    <XAxis dataKey="range" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]}>
                      {priceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Box>
            <ProductPerformanceTable products={products} />
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid  xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Inventory Status</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryDistribution}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid  xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Product Categories</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 2 && (
          <SalesAnalytics products={products} />
        )}

        {tabValue === 3 && (
          <CustomerInsights products={products} />
        )}

        {tabValue === 4 && (
          <AdvancedAnalytics />
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;