using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Table.Models
{
  public partial class Product
  {
    public Product()
    {
      OrderDetails = new HashSet<OrderDetail>();
      Colors = new HashSet<Color>();
      ProductColors = new HashSet<ProductColor>();

    }

    [Key]
    public int Id { get; set; }
    public string Name { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [ForeignKey("Color")]
    public int ColorId { get; set; }
    public virtual Color? Color { get; set; }

    [ForeignKey("Store")]
    public int StoreId { get; set; }
    public virtual Store? Store { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    public virtual ICollection<Color> Colors { get; set; }
    public virtual ICollection<ProductColor> ProductColors { get; set; }



  }
}
