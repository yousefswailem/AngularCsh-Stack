public class ProductDto
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public decimal Price { get; set; }
  public int StoreId { get; set; }
  public List<int>? ColorIds { get; set; } // For storing multiple color IDs
}
