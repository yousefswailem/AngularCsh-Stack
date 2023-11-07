using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Table.Models
{
  public partial class Product
  {
    public Product()
    {
      //OrderDetails = new HashSet<OrderDetail>();
      ColorProducts = new HashSet<ColorProduct>();

    }

    [Key]
    public int Id { get; set; }
    public string Name { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [ForeignKey("Store")]
    public int StoreId { get; set; }
    public virtual Store? Store { get; set; }


    //public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    public virtual ICollection<ColorProduct> ColorProducts { get; set; }



  }
}
