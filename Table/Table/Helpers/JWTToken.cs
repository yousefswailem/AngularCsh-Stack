using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Table.Models;

namespace Table.Helpers
{
  public class JWTToken
  {
    public static string GenerateSecretKey(int keySize = 32) // keySize in bytes
    {
      using (var rng = new RNGCryptoServiceProvider())
      {
        var keyBytes = new byte[keySize]; // 32 bytes = 256 bits
        rng.GetBytes(keyBytes);
        return Convert.ToBase64String(keyBytes);
      }
    }

    public static string GenerateJwtToken(User user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(GenerateSecretKey());
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
          {
            new Claim(ClaimTypes.Name, user.Username)
        }),
        Expires = DateTime.UtcNow.AddDays(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

  }
}
