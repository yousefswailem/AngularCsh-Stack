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
    public virtual DbSet<ProductColor> ProductColor { get; set; } = null!;



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

      OnModelCreatingPartial(modelBuilder);



      modelBuilder.Entity<ProductColor>()
              .HasKey(cp => new { cp.ColorId, cp.ProductId });


      //modelBuilder.Entity<Order>(entity =>
      //{
      //  entity.HasIndex(e => e.CustomerId, "IX_Orders_CustomerId");

      //  entity.HasOne(d => d.Customer)
      //      .WithMany(p => p.Orders)
      //      .HasForeignKey(d => d.CustomerId);
      //});


      //modelBuilder.Entity<OrderDetail>(entity =>
      //{
      //  entity.HasIndex(e => e.OrderId, "IX_OrderDetails_OrderId");

      //  entity.HasIndex(e => e.ProductId, "IX_OrderDetails_ProductId");

      //  entity.HasOne(d => d.Order)
      //      .WithMany(p => p.OrderDetails)
      //      .HasForeignKey(d => d.OrderId);

      //  entity.HasOne(d => d.Product)
      //      .WithMany(p => p.OrderDetails)
      //      .HasForeignKey(d => d.ProductId);
      //});


    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
