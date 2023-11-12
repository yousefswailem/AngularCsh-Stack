using Microsoft.EntityFrameworkCore;
using Table.Models;

namespace AngularC_.Data
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
   
    public virtual DbSet<Customer> Customers { get; set; } = null!;
    public virtual DbSet<Order> Orders { get; set; } = null!;
    public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
    public virtual DbSet<Product> Products { get; set; } = null!;
    public virtual DbSet<Color> Colors { get; set; } = null!;
    public virtual DbSet<Store> Stores { get; set; } = null!;
    public virtual DbSet<ColorProduct> ColorProduct { get; set; } = null!;
    public virtual DbSet<User> Users { get; set; } = null!;




    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

      OnModelCreatingPartial(modelBuilder);



    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
