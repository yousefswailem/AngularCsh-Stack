using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Table.Models;

public class ProductColor
{
  [ForeignKey("Color")]
  public int ColorId { get; set; }
  public Color? Color { get; set; }

  [ForeignKey("Product")]
  public int ProductId { get; set; }
  public Product? Product { get; set; }
}
