using AngularC_.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuration
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

// Configure services
builder.Services.AddDbContext<DataContext>(options =>
{
  options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngularApp", builder =>
  {
    builder.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod();
  });
});

builder.Services.AddControllers();

var app = builder.Build();

// Middleware and routing
if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
}

app.UseRouting();
app.UseCors("AllowAngularApp"); // Enable CORS

app.UseEndpoints(endpoints =>
{
  endpoints.MapControllers();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
