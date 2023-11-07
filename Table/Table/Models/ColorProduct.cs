using System.ComponentModel.DataAnnotations.Schema;

namespace Table.Models
{
  public class ColorProduct
  {
    public int Id { get; set; }


    [ForeignKey("Color")]
    public int ColorId { get; set; }
    public virtual Color? Color { get; set; }

    [ForeignKey("Product")]
    public int ProductId { get; set; }
    public virtual Product? Product { get; set; }
  }
}
