using AngularC_.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Table.Models;

namespace Table.Controllers
{
  [EnableCors("AllowAngularApp")]
  [Route("api/products")]
  [ApiController]
  public class ColorProductController : Controller
  {

    private readonly DataContext _context;

    public ColorProductController(DataContext context)
    {
      _context = context;
    }

    [HttpGet("colorproduct")]
    public async Task<IActionResult> GetColorProduct()
    {
      var colorProduct = await _context.ColorProduct.ToListAsync();
      return Ok(colorProduct);
    }
  }
}
